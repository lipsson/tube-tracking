import { Test, TestingModule } from '@nestjs/testing';
import { SamplesService } from './samples.service';
import { Sample } from '../schema/samples.schema';
import mongoose, { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { CreateSampleDto } from '../dto/add-sample';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('SamplesService', () => {
  let service: SamplesService;
  let model: Model<Sample>;

  const mockSample = {
    _id: '11d7bf83d1561c0ccf3d7c06',
    name: 'Probka 1',
    patientId: '1',
    buildingId: '61c0ccf11d7bf83d153d7',
    archiveBuildingIds: [],
    labWorkers: ['f83d153d7c0661c0ccf11d7b']
  };

  const mockSamplesService = {
    find: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SamplesService, {
        provide: getModelToken(Sample.name),
        useValue: mockSamplesService,
      },],
    }).compile();

    service = module.get<SamplesService>(SamplesService);

    model = module.get<Model<Sample>>(getModelToken(Sample.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find all samples', () => {
    it('should return an array of samples', async () => {

      jest.spyOn(model, 'find').mockResolvedValue([mockSample])

      const result = await service.findAllSample();

      expect(result).toEqual([mockSample]);
    });
  });

  describe('create new sample', () => {
    it('should create and return a new sample', async () => {
      const newSample = {
        patientId: '1',
        buildingId: '61c0ccf11d7bf83d153d7',
        archiveBuildingIds: [],
        labWorkers: ['f83d153d7c0661c0ccf11d7b']
      };

      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockSample as any));

      const result = await service.create(
        newSample as unknown as CreateSampleDto,
      );

      expect(result).toEqual(mockSample);
    });
  });

  describe('find sample by uid', () => {
    it('should find and return a sample with uid', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(mockSample);

      const result = await service.findById(mockSample._id);

      expect(model.findById).toHaveBeenCalledWith(mockSample._id);
      expect(result).toEqual(mockSample);
    });

    it('should throw BadRequestException if invalid uid is provided', async () => {
      const uid = 'invalid-id';

      const isValidObjectIDMock = jest
        .spyOn(mongoose, 'isValidObjectId')
        .mockReturnValue(false);

      expect(service.findById(uid)).toMatchObject({})

      expect(isValidObjectIDMock).toHaveBeenCalledTimes(0);
      isValidObjectIDMock.mockRestore();

    });

    it('should throw NotFoundException if sample is not found', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(null);

      await expect(service.findById(mockSample._id)).rejects.toThrow(
        NotFoundException,
      );

      expect(model.findById).toHaveBeenCalledWith(mockSample._id);
    });
  });

  describe('update sample', () => {
    it('should update and return updated sample', async () => {
      const updatedSample = { ...mockSample, name: 'Probka 2' };
      const sample = { name: 'Probka 2' };

      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(updatedSample);

      const result = await service.updateById(mockSample._id, sample as any);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(mockSample._id, sample, {
        new: true,
        runValidators: true,
      });

      expect(result.name).toEqual(sample.name);
    });
  });

  describe('delete sample with uid', () => {
    it('should delete sample', async () => {
      jest.spyOn(model, 'findByIdAndDelete').mockResolvedValue(mockSample);

      const result = await service.deleteById(mockSample._id);

      expect(model.findByIdAndDelete).toHaveBeenCalledWith(mockSample._id);

      expect(result).toEqual(mockSample);
    });
  });
});

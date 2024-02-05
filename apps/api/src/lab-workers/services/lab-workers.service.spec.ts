import mongoose, { Model } from 'mongoose';
import { CreatePersonDto } from '../dto/add-person';
import { getModelToken } from '@nestjs/mongoose';
import { LabWorkersService } from './lab-workers.service';
import { NotFoundException } from '@nestjs/common';
import { Person } from '../schema/lad-workers.schema';
import { Test, TestingModule } from '@nestjs/testing';

describe('LabWorkersService', () => {
  let service: LabWorkersService;
  let model: Model<Person>;

  const mockPerson = {
    _id: 'f83d153d7c0661c0ccf11d7b',
    firstName: 'Michal',
    surname: 'Lipinski',
    buildingId: '61c0ccf11d7bf83d153d7',
  };

  const mockLabWorkersService = {
    find: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LabWorkersService, {
        provide: getModelToken(Person.name),
        useValue: mockLabWorkersService,
      },],
    }).compile();

    service = module.get<LabWorkersService>(LabWorkersService);

    model = module.get<Model<Person>>(getModelToken(Person.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find all workers', () => {
    it('should return an array of lab workers', async () => {

      jest.spyOn(model, 'find').mockResolvedValue([mockPerson]);

      const result = await service.findAllPerson();

      expect(result).toEqual([mockPerson]);
    });
  });

  describe('create new worker', () => {
    it('should create and return a person', async () => {
      const newPerson = {
        firstName: 'Michal',
        surname: 'Lipinski',
        buildingId: '61c0ccf11d7bf83d153d7',
      };

      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockPerson as any));

      const result = await service.create(
        newPerson as CreatePersonDto,
      );

      expect(result).toEqual(mockPerson);
    });
  });

  describe('find person by uid', () => {
    it('should find and return a person with uid', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(mockPerson);

      const result = await service.findById(mockPerson._id);

      expect(model.findById).toHaveBeenCalledWith(mockPerson._id);
      expect(result).toEqual(mockPerson);
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

    it('should throw NotFoundException if person is not found', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(null);

      await expect(service.findById(mockPerson._id)).rejects.toThrow(
        NotFoundException,
      );

      expect(model.findById).toHaveBeenCalledWith(mockPerson._id);
    });
  });

  describe('update person', () => {
    it('should update and return updated person', async () => {
      const updatedPerson = { ...mockPerson, firstName: 'Jan' };
      const person = { firstName: 'Jan' };

      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(updatedPerson);

      const result = await service.updateById(mockPerson._id, person as any);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(mockPerson._id, person, {
        new: true,
        runValidators: true,
      });

      expect(result.firstName).toEqual(person.firstName);
    });
  });

  describe('delete person with uid', () => {
    it('should delete person', async () => {
      jest.spyOn(model, 'findByIdAndDelete').mockResolvedValue(mockPerson);

      const result = await service.deleteById(mockPerson._id);

      expect(model.findByIdAndDelete).toHaveBeenCalledWith(mockPerson._id);

      expect(result).toEqual(mockPerson);
    });
  });
});

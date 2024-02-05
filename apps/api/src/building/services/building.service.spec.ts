import mongoose, { Model } from 'mongoose';
import { Building } from '../schema/building.schema';
import { BuildingService } from './building.service';
import { CreateBuildingDto } from '../dto/add-building';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('BuildingService', () => {
  let service: BuildingService;
  let model: Model<Building>;

  const mockBuilding = {
    _id: '61c0ccf11d7bf83d153d7',
    city: 'Warsaw',
    geolocation: [52.237049, 21.017532],
    isInUse: true,
  };

  const mockBuildingService = {
    find: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuildingService, {
        provide: getModelToken(Building.name),
        useValue: mockBuildingService,
      },],
    }).compile();

    service = module.get<BuildingService>(BuildingService);

    model = module.get<Model<Building>>(getModelToken(Building.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find all buildings', () => {
    it('should return an array of buildings', async () => {

      jest.spyOn(model, 'find').mockResolvedValue([mockBuilding]);

      const result = await service.findAllBuilding();

      expect(result).toEqual([mockBuilding]);
    });
  });

  describe('create a new building', () => {
    it('should create and return new building', async () => {
      const newBuilding = {
        name: 'Budynek 1',
        city: 'Warsaw',
        geolocation: [52.237049, 21.017532],
        isInUse: true,
      };

      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockBuilding as any));


      const result = await service.create(
        newBuilding as unknown as CreateBuildingDto,
      );

      expect(result).toEqual(mockBuilding);
    });
  });

  describe('find building by uid', () => {
    it('should find and return a building with uid', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(mockBuilding);

      const result = await service.findById(mockBuilding._id);

      expect(model.findById).toHaveBeenCalledWith(mockBuilding._id);
      expect(result).toEqual(mockBuilding);
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

      await expect(service.findById(mockBuilding._id)).rejects.toThrow(
        NotFoundException,
      );

      expect(model.findById).toHaveBeenCalledWith(mockBuilding._id);
    });
  });

  describe('update building', () => {
    it('should update and return update building', async () => {
      const updatedBuilding = { ...mockBuilding, isInUse: false };
      const building = { isInUse: false };

      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(updatedBuilding);

      const result = await service.updateById(mockBuilding._id, building as any);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(mockBuilding._id, building, {
        new: true,
        runValidators: true,
      });

      expect(result.isInUse).toEqual(building.isInUse);
    });
  });

  describe('delete building', () => {
    it('should delete building', async () => {
      jest.spyOn(model, 'findByIdAndDelete').mockResolvedValue(mockBuilding);

      const result = await service.deleteById(mockBuilding._id);

      expect(model.findByIdAndDelete).toHaveBeenCalledWith(mockBuilding._id);

      expect(result).toEqual(mockBuilding);
    });
  });
});

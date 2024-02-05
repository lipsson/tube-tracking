import mongoose, { Model } from 'mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/add-user'
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Users } from '../schema/users.schema';
import { UsersService } from './users.service';;

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<Users>;

  const mockUsers = {
    _id: '83d1561c0c11d7bfcf3d7c06',
    name: 'Michal',
    email: 'lipinski.m@aol.com',
    password: 'Czeremis123456',
    isAdmin: true,
  };

  const mockUsersService = {
    find: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide: getModelToken(Users.name),
        useValue: mockUsersService,
      },],
    }).compile();

    service = module.get<UsersService>(UsersService);

    model = module.get<Model<Users>>(getModelToken(Users.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find all users', () => {
    it('should return an array of users', async () => {

      jest.spyOn(model, 'find').mockResolvedValue([mockUsers]);

      const result = await service.findAllUsers();

      expect(result).toEqual([mockUsers]);
    });
  });

  describe('create new user', () => {
    it('should create and return a new user', async () => {
      const newUser = {
        name: 'Michal',
        email: 'lipinski.m@aol.com',
        password: 'Czeremis123456',
        isAdmin: true,
      };

      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockUsers as any));

      const result = await service.create(
        newUser as CreateUserDto,
      );

      expect(result).toEqual(mockUsers);
    });
  });

  describe('find user by uid', () => {
    it('should find and return a user with uid', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(mockUsers);

      const result = await service.findById(mockUsers._id);

      expect(model.findById).toHaveBeenCalledWith(mockUsers._id);
      expect(result).toEqual(mockUsers);
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

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(null);

      await expect(service.findById(mockUsers._id)).rejects.toThrow(
        NotFoundException,
      );

      expect(model.findById).toHaveBeenCalledWith(mockUsers._id);
    });
  });

  describe('delete user with uid', () => {
    it('should delete user', async () => {
      jest.spyOn(model, 'findByIdAndDelete').mockResolvedValue(mockUsers);

      const result = await service.deleteById(mockUsers._id);

      expect(model.findByIdAndDelete).toHaveBeenCalledWith(mockUsers._id);

      expect(result).toEqual(mockUsers);
    });
  });
});

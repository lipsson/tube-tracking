import * as bcrypt from 'bcryptjs';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { Users } from '../../users/schema/users.schema';

describe('AuthService', () => {
  let service: AuthService;
  let model: Model<Users>;
  let jwtService: JwtService;


  const mockUser = {
    _id: '11d7bf83d153d7c0661c0ccf',
    name: 'Michal',
    email: 'lipinski.m@aol.com',
  };

  let token = 'jwtToken';

  const mockAuthService = {
    create: jest.fn(),
    findOne: jest.fn(),
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getModelToken(Users.name),
          useValue: mockAuthService,
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);

    model = module.get<Model<Users>>(getModelToken(Users.name));
    jwtService = module.get<JwtService>(JwtService);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login page', () => {
    const loginDto = {
      email: 'lipinski.m@aol.com',
      password: 'Czeremis123456',
    };

    it('should log in and return the token', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(mockUser);

      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);
      jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      const result = await service.login(loginDto);

      expect(result).toEqual({ token });
    });

    it('should throw invalid email error', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(null);

      expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw invalid password error', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);

      expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});

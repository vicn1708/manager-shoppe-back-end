import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { UsersEntity } from 'src/entities/users.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
// import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (!user) return null;

    const isMatch = await bcrypt.compare(pass, user.password);

    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async signUp(
    username: string,
    email: string,
    password: string,
  ): Promise<
    | { refresh_token: string; access_token: string }
    | { status: string; message: string }
  > {
    const user = await this.usersService.findOne(email);

    try {
      if (user)
        throw new HttpException('User was existing', HttpStatus.BAD_REQUEST);

      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);

      const newUser = this.usersRepository.create({
        username,
        email,
        password: hashPass,
      });

      await this.usersRepository.save(newUser);

      const payload = { id: newUser.id, username, email };

      const refresh_token = await this.jwtService.signAsync(payload, {
        secret: process.env.SECRET_JWT,
        expiresIn: '30d',
      });

      newUser.refresh_token = refresh_token;

      await this.usersRepository.save(newUser);

      const access_token = await this.jwtService.signAsync(payload, {
        secret: process.env.SECRET_JWT,
        expiresIn: '1h',
      });

      return { refresh_token, access_token };
    } catch (error) {
      return { status: error.status, message: error.message };
    }
  }

  async signIn(
    user: any,
  ): Promise<
    | { refresh_token: string; access_token: string }
    | { status: string; message: string }
  > {
    try {
      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
      };

      const access_token = await this.jwtService.signAsync(payload, {
        secret: process.env.SECRET_JWT,
        expiresIn: '1h',
      });

      return { refresh_token: user.refresh_token, access_token };
    } catch (error) {
      return { status: error.status, message: error.message };
    }
  }

  async getNewAccessToken(token: any) {
    try {
      const verifyToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_JWT,
      });

      if (!verifyToken)
        throw new HttpException(
          'Token expired or false',
          HttpStatus.BAD_REQUEST,
        );

      const payload = {
        id: verifyToken.id,
        username: verifyToken.username,
        email: verifyToken.email,
      };

      const access_token = await this.jwtService.signAsync(payload, {
        secret: process.env.SECRET_JWT,
        expiresIn: '1h',
      });

      return { access_token };
    } catch (error) {
      return error;
    }
  }
}

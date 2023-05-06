import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dtos/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { RefreshToken } from './dtos/refresh-token.dto';

interface IToken {
  refresh_token: string;
  access_token: string;
}

interface IErrorToken {
  status: string;
  message: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: CreateUserDto, required: true })
  async signUp(
    @Body() dataSignUp: CreateUserDto,
  ): Promise<IToken | IErrorToken> {
    const user = await this.authService.signUp(
      dataSignUp.username,
      dataSignUp.email,
      dataSignUp.password,
    );
    return user;
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({ type: LoginDto, required: true })
  signIn(@Request() req): Promise<IToken | IErrorToken> {
    return this.authService.signIn(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @ApiBearerAuth()
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('refresh-token')
  @ApiBody({ type: RefreshToken, required: true })
  getNewAccessToken(@Body('refresh_token') refreshToken: string) {
    return this.authService.getNewAccessToken(refreshToken);
  }
}

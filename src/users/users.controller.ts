import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UserCreateDto } from './dto/user.create.dto';
import { ResultDto } from 'src/dto/result.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}
  
  @UseGuards(JwtAuthGuard)
  @Get('findAll')
  async findAll(): Promise<Object[]> {
    return (await this.usersService.findAll()).map((user) => {
      const { id, password, username, ...result } = user;
      return result;
    });
  }

  @Post('create')
  async create(@Body() data: UserCreateDto): Promise<ResultDto> {
    return this.usersService.create(data);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('login-token')
  async loginToken(@Request() req, @Body() data) {
    return this.authService.loginToken(data.token);
  }
}

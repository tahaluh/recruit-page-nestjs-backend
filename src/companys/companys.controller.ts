import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Inject,
  forwardRef,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ResultDto } from 'src/dto/result.dto';
import { TokenService } from 'src/token/token.service';
import { User } from 'src/users/user.entity';
import { Company } from './company.entity';
import { CompanysService } from './companys.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanysController {
  constructor(
    private readonly companysService: CompanysService,
    private readonly tokenService: TokenService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() data: CreateCompanyDto, @Req() req): Promise<ResultDto> {
    let token = req.headers.authorization;
    let user: User = await this.tokenService.getUserByToken(token);
    if (user) {
      return this.companysService.create(data, user);
    } else {
      throw new HttpException(
        {
          errorMessage: 'Token inválido',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('findByUser')
  async findByUser(
    @Body() data: CreateCompanyDto,
    @Req() req,
  ): Promise<ResultDto | Company> {
    let token = req.headers.authorization;
    let user: User = await this.tokenService.getUserByToken(token);
    if (user) {
      return this.companysService.findCompanyByUser(user);
    } else {
      throw new HttpException(
        {
          errorMessage: 'Token inválido',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Get()
  findAll() {
    return this.companysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companysService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Body() data: UpdateCompanyDto, @Req() req) {
    let token = req.headers.authorization;
    let user: User = await this.tokenService.getUserByToken(token);
    if (user) {
      return this.companysService.update(data, user);
    } else {
      throw new HttpException(
        {
          errorMessage: 'Token inválido',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companysService.remove(+id);
  }
}

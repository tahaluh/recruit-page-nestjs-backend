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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/user.entity';
import { TokenService } from 'src/token/token.service';
import { Company } from 'src/companys/company.entity';
import { CompanysService } from 'src/companys/companys.service';
import { get } from 'http';

@Controller('job')
export class JobsController {
  constructor(
    private readonly jobsService: JobsService,
    private readonly tokenService: TokenService,
    private readonly companysService: CompanysService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() data: CreateJobDto, @Req() req) {
    let token = req.headers.authorization;
    let user: User = await this.tokenService.getUserByToken(token);
    let company: Company = await this.companysService.getCompanyByUser(user);
    if (company){
      return this.jobsService.create(data, company);
    }else {
      throw new HttpException({
        errorMessage: 'Empresa inválida'
      }, HttpStatus.UNAUTHORIZED)
    }
  }

  @Get('/findAll')
  findAll() {
    return this.jobsService.findAll();
  }

  @Get('/findAllByUser')
  async findAllByCompany(@Body() data: CreateJobDto, @Req() req) {
    let token = req.headers.authorization;
    let user: User = await this.tokenService.getUserByToken(token);
    let company: Company = await this.companysService.getCompanyByUser(user);
    return this.jobsService.findAllByCompany(company);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {    
    console.log(id);
    return this.jobsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(+id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id);
  }
}

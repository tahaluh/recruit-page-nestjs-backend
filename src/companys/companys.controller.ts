import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Inject, forwardRef } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ResultDto } from 'src/dto/result.dto';
import { TokenService } from 'src/token/token.service';
import { User } from 'src/users/user.entity';
import { CompanysService } from './companys.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanysController {
  constructor(private readonly companysService: CompanysService,
    private readonly authService: AuthService,
    ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() data: CreateCompanyDto, @Req() req): Promise<ResultDto> {
    let token = req.headers.authorizarion;
    let user: User = await this.authService.getUserByToken(token)
    if (user){
      return this.companysService.create(data, user)
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companysService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companysService.remove(+id);
  }
}

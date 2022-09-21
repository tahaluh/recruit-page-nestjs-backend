import { Inject, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Repository } from 'typeorm/repository/Repository';
import { Company } from './company.entity';
import { ResultDto } from 'src/dto/result.dto';

@Injectable()
export class CompanysService {
  constructor(
    @Inject('COMPANYS_REPOSITORY')
    private companysRepository: Repository<Company>,
  ) {}

  async create(data: CreateCompanyDto, user): Promise<ResultDto> {
    let company = new Company();
    console.log(data)
    company.address = data.address;
    company.cellphone = data.cellphone;
    company.name = data.name;
    company.website = data.website;
    company.user = data.user

    return this.companysRepository
      .save(company)
      .then((result) => {
        return <ResultDto>{
          status: true,
          message: 'Empresa Cadastrada com sucesso',
        };
      })
      .catch((error) => {
        if (error.code === 'ER_DUP_ENTRY') {
          return <ResultDto>{
            status: false,
            message: 'O usuário já tem uma empresa cadastrada',
          };
        }
        return <ResultDto>{
          status: false,
          message: 'Houve um erro ao cadastar a empresa',
        };
      });
  }

  findAll() {
    return `This action returns all companys`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}

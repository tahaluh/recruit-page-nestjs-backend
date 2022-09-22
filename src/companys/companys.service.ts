import { Inject, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Repository } from 'typeorm/repository/Repository';
import { Company } from './company.entity';
import { ResultDto } from 'src/dto/result.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class CompanysService {
  constructor(
    @Inject('COMPANYS_REPOSITORY')
    private companysRepository: Repository<Company>,
  ) {}

  async create(data: CreateCompanyDto, user): Promise<ResultDto> {
    let company = new Company();
    company.address = data.address;
    company.cellphone = data.cellphone;
    company.name = data.name;
    company.website = data.website;
    company.user = user;

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

  findCompanyByUser(user: User) {
    return this.companysRepository.findOneBy({user}).then((response) => {
      return response
    }).catch((error) => {
      return <ResultDto>{
        status: false,
        message: 'Ocorreu um erro ao verificar a empresa',
      };
    });
  }

  findAll() {
    return `This action returns all companys`;
  }

  findOne(id: number) {
    return this.companysRepository.findOneBy({id}).then((response) => {
      if(response){
        return <ResultDto>{
          status: true,
          message: 'A empresa existe',
        };
      }
      return <ResultDto>{
        status: false,
        message: 'A empresa não existe',
      };
    }).catch((error) => {
      return <ResultDto>{
        status: false,
        message: 'Ocorreu um erro ao verificar a empresa',
      };
    });
  }

  async update(data: UpdateCompanyDto, user: User) {
    let company = await this.getCompanyByUser(user)

    if(company){
      company.address = data.address ? data.address : company.address
      company.cellphone = data.cellphone ? data.cellphone : company.cellphone
      company.name = data.name ? data.name : company.name
      company.website = data.website ? data.website : company.website;

      return this.companysRepository.save(company).then((response)=>{
        return <ResultDto>{
          status: true,
          message: 'Empresa Atualizada com sucesso',
        };
      })
      .catch((error)=>{
        return <ResultDto>{
          status: false,
          message: 'Houve um erro ao atualizar a empresa',
        };
      })
    }
    return <ResultDto>{
      status: false,
      message: 'Houve um erro ao validar a sessão',
    };
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }

  async getCompanyByUser(user: User): Promise<Company> {
    let objCompany: Company = await this.companysRepository.findOneBy({ user })
    if (objCompany) {
      return objCompany
    } else {
      return null;
    }
  }
}

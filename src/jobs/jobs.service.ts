import { Inject, Injectable } from '@nestjs/common';
import { response } from 'express';
import { Company } from 'src/companys/company.entity';
import { ResultDto } from 'src/dto/result.dto';
import { Repository } from 'typeorm';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './job.entity';

@Injectable()
export class JobsService {
  constructor(
    @Inject('JOBS_REPOSITORY')
    private jobsRepository: Repository<Job>,
  ) {}

  create(data: CreateJobDto, company: Company): Promise<ResultDto> {
    let job = new Job();
    job.company = company;
    job.office = data.office;
    job.description = data.description;
    job.end_date = new Date(data.end_date);
    job.salary = data.salary;
    job.skills = data.skills;

    return this.jobsRepository
      .save(job)
      .then((result) => {
        return <ResultDto>{
          status: true,
          message: 'Vaga Cadastrada com sucesso',
        };
      })
      .catch((error) => {
        return <ResultDto>{
          status: false,
          message: 'Houve um erro ao cadastar a vaga',
        };
      });
  }

  async findAll() {
    return await this.jobsRepository.find();
  }

  findOne(id: number) {
    return this.jobsRepository
      .findOneBy({ id })
      .then((response) => {
        if (response) {
          return response;
        }
        return <ResultDto>{
          status: false,
          message: 'A vaga não existe',
        };
      })
      .catch((error) => {
        return <ResultDto>{
          status: false,
          message: 'Ocorreu um erro ao verificar a vaga',
        };
      });
  }

  findAllByCompany(company: Company) {
    if (company) {
      return this.jobsRepository
        .findBy({ company })
        .then((response) => {
          if (response) {
            return response;
          }
          return <ResultDto>{
            status: false,
            message: 'A vaga não existe',
          };
        })
        .catch((error) => {
          return <ResultDto>{
            status: false,
            message: 'Ocorreu um erro ao verificar a vaga',
          };
        });
    } else {
      return <ResultDto>{
        status: false,
        message: 'Sessão inválida',
      };
    }
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  async remove(id: number, company: Company) {
    return this.jobsRepository
      .findOneBy({ id, company })
      .then((response) => {
        let job: Job = response;
        if (response) {
          return this.jobsRepository
            .remove(job)
            .then(() => {
              if (response) {
                return <ResultDto>{
                  status: true,
                  message: 'A vaga foi deletada com sucesso',
                };
              }
              return <ResultDto>{
                status: false,
                message: 'Houve um erro desconhecido ao deletar a vaga',
              };
            })
            .catch(() => {
              return <ResultDto>{
                status: false,
                message: 'Houve um erro desconhecido ao deletar a vaga',
              };
            });
        }
        return <ResultDto>{
          status: false,
          message: 'A vaga não existe ou a sessão está inválida',
        };
      })
      .catch((error) => {
        return <ResultDto>{
          status: false,
          message: 'Ocorreu um erro ao verificar a vaga',
        };
      });
  }
}

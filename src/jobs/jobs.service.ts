import { Inject, Injectable } from '@nestjs/common';
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
    return await this.jobsRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}

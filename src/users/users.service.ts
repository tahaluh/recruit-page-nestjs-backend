import { Injectable, Inject } from '@nestjs/common';
import { ResultDto } from 'src/dto/result.dto';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user.create.dto';
import { User } from './user.entity';
import * as bcrypt from "bcrypt"

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async create(data: UserCreateDto): Promise<ResultDto> {
    let user = new User();
    user.email = data.email;
    user.username = data.username;
    user.password = bcrypt.hashSync(data.password, 8);
    return this.usersRepository
      .save(user)
      .then((result) => {
        return <ResultDto>{
          status: true,
          message: 'Usuário Cadastrado com sucesso',
        };
      })
      .catch((error) => {
        if (error.code === 'ER_DUP_ENTRY'){
          return <ResultDto>{
            status: false,
            message: 'Esse email já está cadastrado, tente fazer login',
          };
        }
        return <ResultDto>{
          status: false,
          message: 'Houve um erro ao cadastar o usuário',
        };
      });
  }

  async findOneBy(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({email: email});
  }
}

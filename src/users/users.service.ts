import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { ResultDto } from 'src/dto/result.dto';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user.create.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserUpdateDto } from './dto/user.update.dto';
import { TokenService } from 'src/token/token.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<User>,
    @Inject(forwardRef(() => TokenService))
    private tokenService: TokenService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
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
        if (error.code === 'ER_DUP_ENTRY') {
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
    return this.usersRepository.findOneBy({ email: email });
  }

  async update(data: UserUpdateDto, token: string): Promise<ResultDto> {
    let user: User = await this.tokenService.getUserByToken(token);
    if (user && bcrypt.compareSync(data.password, user.password)) {
      this.tokenService.deleteToken(token);
      user.username = data.username ? data.username : user.username;
      user.email = data.email ? data.email : user.email;
      user.password = data.newPassword
        ? bcrypt.hashSync(data.newPassword, 8)
        : user.password;
      return this.usersRepository
        .save(user)
        .then(async (result) => {
          return <ResultDto>{
            status: true,
            message: 'Usuário atualizado com sucesso',
            access_token: (await this.authService.login(user)).access_token,
          };
        })
        .catch((error) => {
          if (error.code === 'ER_DUP_ENTRY') {
            return <ResultDto>{
              status: false,
              message: 'Esse email já está cadastrado',
            };
          }
          return <ResultDto>{
            status: false,
            message: 'Houve um erro ao atualizar o usuário',
          };
        });
    }
    return <ResultDto>{
      status: false,
      message: 'Houve um erro ao validar a sessão',
    };
  }
}

import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  forwardRef,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Token } from './token.entity';

@Injectable()
export class TokenService {
  constructor(
    @Inject('TOKEN_REPOSITORY')
    private tokenRepository: Repository<Token>,
    private usersService: UsersService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async save(hash: string, username: string) {
    let objToken = await this.tokenRepository.findOneBy({ username: username });
    if (objToken) {
      this.tokenRepository.update(objToken.id, {
        hash: hash,
      });
    } else {
      this.tokenRepository.save({
        hash: hash,
        username: username,
      });
    }
  }

  async refreshToken(oldToken: string) {
    let objToken = await this.tokenRepository.findOneBy({ hash: oldToken });
    if (objToken) {
      let user = await this.usersService.findOneBy(objToken.username);
      return this.authService.login(user);
    } else {
      return new HttpException(
        {
          errorMessage: 'Token inválido',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async getUserByToken(token: string): Promise<User> {
    token = token ? token.replace('Bearer ', '').trim() : token;
    let objToken: Token = await this.tokenRepository.findOneBy({hash: token});
    if (objToken) {
      let user = await this.usersService.findOneBy(objToken.username);
      return user;
    } else {
      return null;
    }
  }

  async deleteToken(token: string) {
    token = token ? token.replace('Bearer ', '').trim() : token;
    let tokenObj = await this.tokenRepository.findOne({
      where: { hash: token },
    });
    if (tokenObj) {
      return await this.tokenRepository.remove(tokenObj);
    }
    return 
  }

  async updateToken(token: string, username: string) {
    token = token ? token.replace('Bearer ', '').trim() : token;
    let tokenObj = await this.tokenRepository.findOne({
      where: { hash: token },
    });
    tokenObj.username = username
    if (tokenObj){
      return await this.tokenRepository.save(tokenObj)
    }
  }
}

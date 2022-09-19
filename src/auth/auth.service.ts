import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsersService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async validarUsuario(email: string, senha: string): Promise<any> {
    const user = await this.usuarioService.findOneBy(email);
    if (user && bcrypt.compareSync(senha, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    this.tokenService.save(token, user.email)
    return {
      access_token: token,
    };
  }
}
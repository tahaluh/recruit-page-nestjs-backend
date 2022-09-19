import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsersService,
    private jwtService: JwtService,
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
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

import { Controller, Put, Body, Get, UseGuards, Req } from '@nestjs/common';
import { get } from 'http';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ResultDto } from 'src/dto/result.dto';
import { RefreshTokenDto } from './dto/refresh.token.dto';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Put('refresh')
  async refreshToken(@Body() data: RefreshTokenDto) {
    return this.tokenService.refreshToken(data.oldToken);
  }

  @Get('verify')
  async verifyToken(@Body() data, @Req() req): Promise<ResultDto> {
    let token = req.headers.authorization;
    return this.tokenService.verifyToken(token);
  }
}

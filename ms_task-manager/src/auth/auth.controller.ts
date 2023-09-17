import { Controller, Post, Body } from '@nestjs/common';
import { AuthService, SignInProps } from './auth.service';

@Controller('/login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async signIn(@Body() data: SignInProps) {
    return await this.authService.signIn(data);
  }
}

import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from '../users/repository/interface/user.repository.interface';
import { UnauthorizedException, Injectable } from '@nestjs/common';

export type SignInProps = {
  username: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(
    private userRepository: IUserRepository,
    private jwtService: JwtService,
  ) {}

  async signIn({ username, password }: SignInProps) {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    const passwordAreEqual = await this.userRepository.comparePasswords(
      password,
      user.password,
    );

    if (!passwordAreEqual) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

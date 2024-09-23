import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt.payload';
import { User } from '../entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super({
      secretOrKey: process.env.SECRET_PASSWORD,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayload) {
    const { email } = payload;
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new BadRequestException('Unauthorized');
    }
    if (!user.isActive) {
      throw new BadRequestException('Unauthorized');
    }
    return user;
  }
}

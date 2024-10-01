import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    try {
      const user = this.userRepository.create({
        ...createAuthDto,
        password: bcrypt.hashSync(createAuthDto.password, 12),
      });
      await this.userRepository.save(user);

      const { email, fullName, phone } = user;
      return { user: { email, fullName, phone } };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  private async generateToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async login(loginDot: LoginAuthDto) {
    try {
      const { email, password } = loginDot;
      const user = await this.userRepository.findOneBy({ email });

      if (!bcrypt.compareSync(password, user.password)) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
      const payload: JwtPayload = { email, fullName: user.fullName };
      const token = await this.generateToken(payload);
      return { email, token };
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('Credenciales inválidas');
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}

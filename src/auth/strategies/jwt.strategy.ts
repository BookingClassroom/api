import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'secret',
    });
  }

  async validate(payload: any) {
    // Récupérer l'utilisateur complet depuis la base de données
    const user = await this.userRepository.findOne({ where: { id: payload.id } });
    
    if (!user) {
      return null;
    }

    // Retourner l'utilisateur avec ses rôles
    return {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };
  }
}
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader)
      throw new UnauthorizedException('Authorization header missing');

    const token = authHeader.split(' ')[1];
    try {
      const payload = this.jwtService.verify(token);
      if (payload.email !== 'admin@admin.com')
        throw new UnauthorizedException('Admin access required');
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

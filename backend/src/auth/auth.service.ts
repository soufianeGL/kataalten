/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  private readonly users: {
    id: string;
    email: string;
    password: string;
    isAdmin: boolean;
  }[] = [];
  private tokenKey = 'auth-token';
  constructor(private readonly jwtService: JwtService) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = {
      id: `${Date.now()}`,
      email: registerDto.email,
      password: hashedPassword,
      isAdmin: registerDto.isAdmin,
    };
    this.users.push(user);
    return { id: user.id, email: user.email };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = this.users.find((user) => user.email === email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      isAdmin: user.isAdmin,
    };
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { Roles } from './auth/roles.decorator';
import { Role } from '../generated/prisma';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health/db')
  async checkDatabase() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'Database connected' };
    } catch (error) {
      return { status: 'Database error', error: error.message };
    }
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ANDREI)
  getAdminData(): string {
    return 'This is admin-only data';
  }

  @Get('daemon')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.DAEMON, Role.ANDREI)
  getDaemonData(): string {
    return 'This is daemon data';
  }

  @Get('resistance')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.NETWORK_ADMIN, Role.DAEMON, Role.ANDREI)
  getResistanceData(): string {
    return 'Resistance tips and memes';
  }
}
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { Roles } from './auth/roles.decorator';
import { Role } from '../generated/prisma';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
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
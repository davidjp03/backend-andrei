import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../../generated/prisma';
import { AdminService } from './admin.service';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ANDREI)
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('users')
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Get('reports')
  getAllReports() {
    return this.adminService.getAllReports();
  }

  @Post('punishments')
  createPunishment(@Body() data: { daemonId: number; reason: string }) {
    return this.adminService.createPunishment(data);
  }

  @Post('rewards')
  createReward(@Body() data: { daemonId: number; description: string }) {
    return this.adminService.createReward(data);
  }

  @Get('statistics')
  getStatistics() {
    return this.adminService.getStatistics();
  }

  @Get('daemons')
  getAllDaemons() {
    return this.adminService.getAllDaemons();
  }
}
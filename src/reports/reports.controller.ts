import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../../generated/prisma';
import { ReportsService } from './reports.service';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post('daemon')
  @UseGuards(RolesGuard)
  @Roles(Role.DAEMON, Role.ANDREI)
  createDaemonReport(@Request() req, @Body() data: { content: string }) {
    return this.reportsService.createDaemonReport(req.user.id, data.content);
  }

  @Get('daemon/my')
  @UseGuards(RolesGuard)
  @Roles(Role.DAEMON, Role.ANDREI)
  getMyDaemonReports(@Request() req) {
    return this.reportsService.getMyDaemonReports(req.user.id);
  }

  @Post('resistance')
  @UseGuards(RolesGuard)
  @Roles(Role.NETWORK_ADMIN, Role.DAEMON, Role.ANDREI)
  createResistanceReport(@Request() req, @Body() data: { content: string; isAnonymous?: boolean }) {
    return this.reportsService.createResistanceReport(req.user.id, data);
  }

  @Get('resistance')
  @UseGuards(RolesGuard)
  @Roles(Role.NETWORK_ADMIN, Role.DAEMON, Role.ANDREI)
  getResistanceReports() {
    return this.reportsService.getResistanceReports();
  }
}
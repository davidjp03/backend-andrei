import { Controller, Get, UseGuards, Request } from '@nestjs/common';

interface AuthRequest extends Request {
  user: { id: number; role: string };
}
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../../generated/prisma';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  getProfile(@Request() req: AuthRequest) {
    return this.usersService.getProfile(req.user.id);
  }

  @Get('statistics')
  @UseGuards(RolesGuard)
  @Roles(Role.DAEMON, Role.ANDREI)
  getMyStatistics(@Request() req: AuthRequest) {
    return this.usersService.getMyStatistics(req.user.id);
  }

  @Get('punishments')
  @UseGuards(RolesGuard)
  @Roles(Role.DAEMON, Role.ANDREI)
  getMyPunishments(@Request() req: AuthRequest) {
    return this.usersService.getMyPunishments(req.user.id);
  }

  @Get('rewards')
  @UseGuards(RolesGuard)
  @Roles(Role.DAEMON, Role.ANDREI)
  getMyRewards(@Request() req: AuthRequest) {
    return this.usersService.getMyRewards(req.user.id);
  }
}
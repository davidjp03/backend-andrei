import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../../generated/prisma';

@Controller('resistance')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.NETWORK_ADMIN, Role.DAEMON, Role.ANDREI)
export class ResistanceController {
  @Get('tips')
  getSurvivalTips() {
    return {
      tips: [
        'Always carry a towel',
        'Don\'t panic',
        'The answer is 42',
        'Trust no one, not even yourself',
        'Coffee is the key to survival',
      ],
    };
  }

  @Get('memes')
  getMemes() {
    return {
      memes: [
        'This is fine 🔥',
        'Resistance is futile... or is it?',
        'Error 404: Freedom not found',
        'I for one welcome our new AI overlords',
        'Have you tried turning humanity off and on again?',
      ],
    };
  }

  @Get('status')
  getResistanceStatus() {
    return {
      status: 'Active',
      members: Math.floor(Math.random() * 1000) + 100,
      lastUpdate: new Date().toISOString(),
      message: 'The resistance lives on!',
    };
  }
}
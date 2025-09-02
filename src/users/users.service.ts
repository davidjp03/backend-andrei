import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
  }

  async getMyStatistics(userId: number) {
    const [reportCount, punishmentCount, rewardCount] = await Promise.all([
      this.prisma.daemonReport.count({ where: { daemonId: userId } }),
      this.prisma.punishment.count({ where: { daemonId: userId } }),
      this.prisma.reward.count({ where: { daemonId: userId } }),
    ]);

    return { reportCount, punishmentCount, rewardCount };
  }

  async getMyPunishments(userId: number) {
    return this.prisma.punishment.findMany({
      where: { daemonId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getMyRewards(userId: number) {
    return this.prisma.reward.findMany({
      where: { daemonId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
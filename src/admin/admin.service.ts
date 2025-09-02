import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
  }

  async getAllReports() {
    return {
      daemonReports: await this.prisma.daemonReport.findMany({
        include: { daemon: { select: { name: true, email: true } } },
      }),
      resistanceReports: await this.prisma.resistanceReport.findMany({
        include: { submittedBy: { select: { name: true, email: true } } },
      }),
    };
  }

  async createPunishment(data: { daemonId: number; reason: string }) {
    return this.prisma.punishment.create({
      data,
      include: { daemon: { select: { name: true, email: true } } },
    });
  }

  async createReward(data: { daemonId: number; description: string }) {
    return this.prisma.reward.create({
      data,
      include: { daemon: { select: { name: true, email: true } } },
    });
  }

  async getStatistics() {
    const [userCount, daemonReportCount, resistanceReportCount] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.daemonReport.count(),
      this.prisma.resistanceReport.count(),
    ]);

    return { userCount, daemonReportCount, resistanceReportCount };
  }

  async getAllDaemons() {
    return this.prisma.user.findMany({
      where: { role: 'DAEMON' },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        _count: {
          select: {
            daemonReports: true,
            punishments: true,
            rewards: true,
          },
        },
      },
    });
  }
}
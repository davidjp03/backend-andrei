import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async createDaemonReport(daemonId: number, content: string) {
    return this.prisma.daemonReport.create({
      data: { daemonId, content },
    });
  }

  async getMyDaemonReports(daemonId: number) {
    return this.prisma.daemonReport.findMany({
      where: { daemonId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createResistanceReport(userId: number, data: { content: string; isAnonymous?: boolean }) {
    return this.prisma.resistanceReport.create({
      data: {
        content: data.content,
        userId: data.isAnonymous ? null : userId,
        isAnonymous: data.isAnonymous ?? true,
      },
    });
  }

  async getResistanceReports() {
    return this.prisma.resistanceReport.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        submittedBy: {
          select: { name: true, email: true },
        },
      },
    });
  }
}
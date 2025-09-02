import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { ResistanceModule } from './resistance/resistance.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    AdminModule,
    ReportsModule,
    UsersModule,
    ResistanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

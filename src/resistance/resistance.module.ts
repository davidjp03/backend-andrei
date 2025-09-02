import { Module } from '@nestjs/common';
import { ResistanceController } from './resistance.controller';

@Module({
  controllers: [ResistanceController],
})
export class ResistanceModule {}
import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { UsersModule } from '../users/user.module';

@Module({
  imports: [UsersModule],
  controllers: [MetricsController],
  providers: [MetricsService],
})
export class MetricsModule {}
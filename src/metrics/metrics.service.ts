import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/user.services';

@Injectable()
export class MetricsService {
  constructor(private usersService: UsersService) {}

  async getUserMetrics() {
    return await this.usersService.getUserMetrics();
  }
}
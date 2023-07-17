import { Module } from '@nestjs/common';
import { TenantController } from './controllers';
import { CreateTenantUseCase } from '@application/use-cases/tenant';

@Module({
  controllers: [TenantController],
  providers: [CreateTenantUseCase],
})
export class HttpModule {}

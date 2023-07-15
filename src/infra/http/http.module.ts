import { Module } from '@nestjs/common';
import { TenantController } from './controllers';
import { CreateTenantUseCase } from '@application/use-cases/tenant';
import { DatabaseModule } from '@infra/service/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TenantController],
  providers: [CreateTenantUseCase],
})
export class HttpModule {}

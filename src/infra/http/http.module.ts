import { DatabaseModule } from '@infra/service/database/database.module';
import { Module } from '@nestjs/common';
import { TenantController } from './controllers';
import { CreateTenantUseCase } from '@application/use-cases/tenant';

@Module({
  imports: [DatabaseModule],
  controllers: [TenantController],
  providers: [CreateTenantUseCase],
})
export class HttpModule {}

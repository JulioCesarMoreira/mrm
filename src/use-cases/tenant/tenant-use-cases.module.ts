import { Module } from '@nestjs/common';
import { DataServicesModule } from '../../service/data-service/data-services.module';
import { TenantFactoryService } from './tenant-factory.service';
import { TenantUseCases } from './tenant.use-case';

@Module({
  imports: [DataServicesModule],
  providers: [TenantFactoryService, TenantUseCases],
  exports: [TenantFactoryService, TenantUseCases],
})
export class TenantUseCasesModule {}

import { Module } from '@nestjs/common';
import { AppController, TenantController } from './controllers';
import { TenantUseCasesModule } from './use-cases/tenant';
@Module({
  imports: [TenantUseCasesModule],
  controllers: [AppController, TenantController],
  providers: [],
})
export class AppModule {}

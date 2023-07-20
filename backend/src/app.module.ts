import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/service/database/database.module';
import { HttpModule } from '@infra/http/http.module';
@Module({
  imports: [DatabaseModule, HttpModule],
})
export class AppModule {}

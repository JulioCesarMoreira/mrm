import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/service/database/database.module';
import { HttpModule } from '@infra/http/http.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    HttpModule,
    JwtModule.register({
      global: true,
      verifyOptions: { algorithms: ['RS256'] },
    }),
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
@Module({
  providers: [
    PrismaService,
    // Repositories here
    // {
    //   provide: UserRepository,
    //   useClass: PrismaUserRepository,
    // },
    //   provide: TenantRepository,
    //   useClass: PrismaTenantRepository,
    // },
  ],
  exports: [
    // Repositories here
    // {
    //   provide: UserRepository,
    //   useClass: PrismaUsersRepository,
    // },
    // {
    //   provide: TenantRepository,
    //   useClass: PrismaTenantRepository,
    // },
  ],
})
export class DatabaseModule {}

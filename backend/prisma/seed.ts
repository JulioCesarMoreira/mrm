import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main(): Promise<void> {
  await prisma.city.create({
    data: {
      state: 'PR',
      name: 'Ponta Grossa',
    },
  });

  await prisma.tenant.create({
    data: {
      id: '3d222283-d485-4b54-acb8-5f290c105143',
      cognitoId: '3d222283-d485-4b54-acb8-5f290c105143',
    },
  });
}

main();

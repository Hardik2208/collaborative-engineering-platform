import { prisma } from "../src/shared/prisma/prisma.service";

beforeEach(async () => {
  await prisma["refreshToken"].deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});
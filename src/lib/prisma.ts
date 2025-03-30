import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  omit: {
    user: {
      password: true,
      salt: true,
    },
  },
});

prisma
  .$connect()
  .then(() => console.log("Successfully connected to the database"))
  .catch(console.error);

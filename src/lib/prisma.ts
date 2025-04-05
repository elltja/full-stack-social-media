import { Post, PrismaClient, User } from "@prisma/client";

export type SafeUser = Omit<User, "password" | "salt">;
export type FullUser = User;
export type PostWithUser = Post & {
  author: User;
};

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

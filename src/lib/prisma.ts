import { Comment, Like, Post, PrismaClient, Save, User } from "@prisma/client";

export type SafeUser = Omit<User, "password" | "salt">;
export type PostWithUser = Post & {
  author: User;
};

export type FullPost = Post & {
  author: User;
  likes: Like[];
  comments: Comment[];
  saves: Save[];
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
  .catch(console.error)
  .finally(prisma.$disconnect);

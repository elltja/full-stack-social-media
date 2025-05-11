import { Prisma, PrismaClient, User } from "@prisma/client";
import "server-only";

export type PublicUser = Omit<User, "password" | "salt">;

export type PostWithAUthor = Prisma.PostGetPayload<{
  include: { author: { omit: { password: true; salt: true } } };
}>;

export type PostWithLikesAndSaves = Prisma.PostGetPayload<{
  include: {
    likes: true;
    saves: true;
  };
}>;

export type PostWithLikesSavesAndComments = Prisma.PostGetPayload<{
  include: {
    author: true;
    likes: true;
    saves: true;
    comments: { include: { user: true } };
  };
}>;

export type UserWithPosts = Prisma.UserGetPayload<{
  omit: { password: true; salt: true };
  include: { posts: true };
}>;

export const prisma = new PrismaClient({
  omit: {
    user: {
      password: true,
      salt: true,
    },
  },
});

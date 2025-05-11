import { Prisma, PrismaClient, User } from "@prisma/client";
import "server-only";

export type PublicUser = Omit<User, "password" | "salt">;

type SafelyOmitedUser = { omit: { password: true; salt: true } };

export type PostWithLikesSavesAndAuthor = Prisma.PostGetPayload<{
  include: {
    likes: true;
    saves: true;
    author: SafelyOmitedUser;
  };
}>;
export const prisma = new PrismaClient({
  omit: {
    user: {
      password: true,
      salt: true,
    },
  },
});

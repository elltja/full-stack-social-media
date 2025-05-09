import { Comment, Like, Post, PrismaClient, Save, User } from "@prisma/client";
import "server-only";

export type PublicUser = Omit<User, "password" | "salt">;
export type PostWithUser = Post & {
  author: User;
};

export type FullPost = Post & {
  author: User;
  likes: Like[];
  saves: Save[];
};

export type FullPostWithFullComments = Post & {
  author: User;
  likes: Like[];
  comments: (Comment & {
    user: PublicUser;
  })[];
  saves: Save[];
};

export type UserWithPosts = PublicUser & {
  posts: FullPost[];
};

export const prisma = new PrismaClient({
  omit: {
    user: {
      password: true,
      salt: true,
    },
  },
});

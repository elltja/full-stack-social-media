"use server";

import { prisma } from "@/lib/server/prisma";
import { getCurrentUser } from "@/modules/auth/lib/user";
import { revalidatePath } from "next/cache";

export async function followUser(followeeId: string) {
  try {
    const currentUser = await getCurrentUser();
    if (currentUser.id === followeeId) {
      throw new Error("Users cannot follow themselves.");
    }
    await prisma.follow.create({
      data: {
        followerId: currentUser.id,
        followeeId: followeeId,
      },
    });
    revalidatePath("/");
  } catch (error) {
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      console.warn("User is already followed.");
      return;
    }

    console.error(error);
    throw new Error("Error following user: " + error);
  }
}

export async function unfollowUser(followeeId: string) {
  try {
    const currentUser = await getCurrentUser();

    await prisma.follow.delete({
      where: {
        followerId_followeeId: {
          followerId: currentUser.id,
          followeeId,
        },
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.warn("Unfollow error or not followed:", error);
  }
}

export async function getFollowingUsers(currentUserId: string) {
  const follows = await prisma.follow.findMany({
    where: { followerId: currentUserId },
    select: {
      followee: {
        select: {
          id: true,
          name: true,
          avatar_url: true,
        },
      },
    },
  });

  return follows.map((f) => f.followee);
}

export async function getFollowers(userId: string) {
  const follows = await prisma.follow.findMany({
    where: { followeeId: userId },
    select: {
      follower: {
        select: {
          id: true,
          name: true,
          avatar_url: true,
        },
      },
    },
  });

  return follows.map((f) => f.follower);
}

export async function isFollowing(userId: string): Promise<boolean> {
  const currentUser = await getCurrentUser();

  const follow = await prisma.follow.findUnique({
    where: {
      followerId_followeeId: {
        followerId: currentUser.id,
        followeeId: userId,
      },
    },
  });

  return !!follow;
}

export async function toggleFollow(followeeId: string, isFollowing: boolean) {
  try {
    if (isFollowing) {
      await unfollowUser(followeeId);
    } else {
      await followUser(followeeId);
    }
  } catch (error) {
    console.error(error);
  }
}

// export async function isMutualFollower(
//   userAId: string,
//   userBId: string
// ): Promise<boolean> {
//   const [aFollowsB, bFollowsA] = await Promise.all([
//     prisma.follow.findUnique({
//       where: {
//         followerId_followeeId: {
//           followerId: userAId,
//           followeeId: userBId,
//         },
//       },
//     }),
//     prisma.follow.findUnique({
//       where: {
//         followerId_followeeId: {
//           followerId: userBId,
//           followeeId: userAId,
//         },
//       },
//     }),
//   ]);

//   return Boolean(aFollowsB && bFollowsA);
// }

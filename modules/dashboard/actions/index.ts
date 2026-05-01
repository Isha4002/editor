"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { Playground } from "@prisma/client";

export const getAllPlaygroundForUser = async (): Promise<Playground[]> => {
  const session = await auth();
  const user = session?.user;

  if (!user?.id) return [];

  try {
    const playground = await db.playground.findMany({
      where: {
        userId: user.id,
      },
    });

    return playground;
  } catch (error) {
    console.log(error);
    return [];
  }
};
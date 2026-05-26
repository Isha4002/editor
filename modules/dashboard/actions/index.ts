
"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/modules/auth/actions";
import { revalidatePath } from "next/cache";

export const toggleStarMarked = async (playgroundId: string, isChecked: boolean) => {
  const user = await currentUser();
  const userId = user?.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    if(isChecked){
      await db.starMark.create({
        data:{
          userId: userId!,
          playgroundId,
          isMarked: isChecked,
        }
      })
    }
    else{
      await db.starMark.delete({
        where:{
          userId_playgroundId: {
            userId,
            playgroundId: playgroundId,
          }
        }
      });
    }

    revalidatePath("/dashboard");
    return { success: true, isMarked: isChecked };
  }catch (error) {
    console.error("Error updating problem:", error);
    return { success: false, error: "Failed to update mark for revision" };
  }
}


// export const getAllPlaygroundForUser = async () => {
//   try {
//     const user = await currentUser();

//     if (!user?.id) {
//       return [];
//     }

//     const playgrounds = await db.playground.findMany({
//       where: {
//         userId: user.id,
//       },

//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     return JSON.parse(
//       JSON.stringify(playgrounds)
//     );
//   } catch (error) {
//     console.log(
//       "GET PLAYGROUND ERROR:",
//       error
//     );

//     return [];
//   }
// };


export const getAllPlaygroundForUser =
  async () => {
    try {
      const user =
        await currentUser();

      if (!user?.id) {
        return [];
      }

    const playgrounds =
  await db.playground.findMany({
    where: {
      userId: user.id,
    },

    orderBy: {
      createdAt: "desc",
    },

    include: {
      
  
      Starmark: true,
    },
  });

      return JSON.parse(
        JSON.stringify(
          playgrounds
        )
      );
    } catch (error) {
      console.log(error);

      return [];
    }
  };

// 🔹 CREATE
export const createPlayground = async (data: {
  title: string;
  template:
    | "REACT"
    | "NEXTJS"
    | "EXPRESS"
    | "VUE"
    | "HONO"
    | "ANGULAR";
  description?: string;
}) => {
  try {
    const user = await currentUser();

    console.log("CURRENT USER:", user);

    if (!user || !user.id) {
      throw new Error("User not authenticated");
    }

    const playground = await db.playground.create({
      data: {
        title: data.title,
        description: data.description || "",
        template: data.template,
        userId: user.id,
      },
    });

    revalidatePath("/dashboard");

    return JSON.parse(JSON.stringify(playground));
  } catch (error) {
    console.log("CREATE ERROR:", error);
  }
};

// 🔹 DELETE
export const deleteProjectById = async (id: string) => {
  try {
    await db.playground.delete({
      where: {
        id,
      },
    });

    revalidatePath("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

// 🔹 EDIT
export const editProjectById = async (
  id: string,
  data: {
    title: string;
    description: string;
  }
) => {
  try {
    await db.playground.update({
      where: {
        id,
      },

      data,
    });

    revalidatePath("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

// 🔹 DUPLICATE
export const duplicateProjectById = async (
  id: string
) => {
  try {
    const original =
      await db.playground.findUnique({
        where: {
          id,
        },
      });

    if (!original) {
      throw new Error(
        "Original playground not found"
      );
    }

    const duplicatedPlayground =
      await db.playground.create({
        data: {
          title: `${original.title} (Copy)`,
          description:
            original.description || "",
          template: original.template,
          userId: original.userId,
        },
      });

    revalidatePath("/dashboard");

    return duplicatedPlayground;
  } catch (error) {
    console.error(
      "Error duplicating playground:",
      error
    );
  }
};
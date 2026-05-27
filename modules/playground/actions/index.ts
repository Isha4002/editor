 "use server";

import { db } from "@/lib/db";
import { TemplateFolder } from "../lib/path-to-json";
import { currentUser } from "@/modules/auth/actions";

export const getPlaygroundById =
  async (id: string) => {
    try {
      const playground =
        await db.playground.findUnique({
          where: { id },

          include: {
            title: true,
            templateFiles: true,
          },
        });

      return JSON.parse(
        JSON.stringify(
          playground
        )
      );
    } catch (error) {
      console.log(error);

      return null;
    }
  };

export const saveUpdatedCode = async (
  playgroundId: string,
  data: TemplateFolder
) => {
  const user = await currentUser();
  if (!user) return null;

  try {
    const updatedPlayground = await db.templateFile.upsert({
      where: {id: playgroundId },
      update: {
        content: JSON.stringify(data),
      },
      create: {
        playgroundId: playgroundId,
        content: JSON.stringify(data),
      },
    });

    return updatedPlayground;
  } catch (error) {
    console.log(error);
    return null;
  }
};
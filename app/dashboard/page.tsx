export const dynamic = "force-dynamic";

import {
  deleteProjectById,
  duplicateProjectById,
  editProjectById,
  getAllPlaygroundForUser,
} from "@/modules/dashboard/actions";

import AddNewButton from "@/modules/dashboard/components/add-new";
import AddRepo from "@/modules/dashboard/components/add-repo";
import EmptyState from "@/modules/dashboard/components/empty-state";
import ProjectTable from "@/modules/dashboard/components/project-table";

import React from "react";

export default async function Page() {
  const playgrounds =
    (await getAllPlaygroundForUser()) || [];

  console.log(
    "DASHBOARD PLAYGROUNDS:",
    playgrounds
  );

  return (
    <div className="flex flex-col justify-start items-center min-h-screen mx-auto max-w-7xl px-4 py-10">
      
      {/* TOP ACTION BUTTONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <AddNewButton />
        <AddRepo />
      </div>

      {/* PROJECT TABLE */}
      <div className="mt-10 flex flex-col items-center w-full">
        {playgrounds &&playgrounds.length > 0 ? (
          <ProjectTable
            projects={playgrounds}
            onDeleteProject={deleteProjectById}
            onUpdateProject={editProjectById}
            onDuplicateProject={duplicateProjectById}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
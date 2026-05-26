"use client";

import { format } from "date-fns";

import type { Project } from "../types";

import Link from "next/link";

import { useState } from "react";

import { toast } from "sonner";

import  Image  from "next/image";

import {
  MoreHorizontal,
  Edit3,
  Trash2,
  ExternalLink,
  Copy,
 Download,
  Eye,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import MarkedToggleButton from "./marked-toggle";

interface ProjectTableProps {
  projects: any[];

  onUpdateProject?: (
    id: string,
    data: {
      title: string;
      description: string;
    }
  ) => Promise<void>;

  onDeleteProject?: (
    id: string
  ) => Promise<void>;

  onDuplicateProject?: (
    id: string
  ) => Promise<void>;
}

interface EditProjectData {
  title: string;
  description: string;
}

export default function ProjectTable({
  projects,
  onUpdateProject,
  onDeleteProject,
  onDuplicateProject,
}: ProjectTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const [editDialogOpen, setEditDialogOpen] =
    useState(false);

  const [selectedProject, setSelectedProject] =
    useState<any>(null);

  const [editData, setEditData] =
    useState<EditProjectData>({
      title: "",
      description: "",
    });

  const [isLoading, setIsLoading] =
    useState(false);

  // =========================
  // EDIT CLICK
  // =========================
  const handleEditClick = (
    project: any
  ) => {
    setSelectedProject(project);

    setEditData({
      title: project.title,
      description:
        project.description || "",
    });

    setEditDialogOpen(true);
  };

  // =========================
  // DELETE CLICK
  // =========================
  const handleDeleteClick = (
    project: any
  ) => {
    setSelectedProject(project);

    setDeleteDialogOpen(true);
  };

  // =========================
  // UPDATE PROJECT
  // =========================
  const handleUpdateProject =
    async () => {
      if (
        !selectedProject ||
        !onUpdateProject
      )
        return;

      setIsLoading(true);

      try {
        await onUpdateProject(
          selectedProject.id,
          editData
        );

        setEditDialogOpen(false);

        toast.success(
          "Project updated successfully"
        );
      } catch (error) {
        toast.error(
          "Failed to update project"
        );

        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

  // =========================
  // DELETE PROJECT
  // =========================
  const handleDeleteProject =
    async () => {
      if (
        !selectedProject ||
        !onDeleteProject
      )
        return;

      setIsLoading(true);

      try {
        await onDeleteProject(
          selectedProject.id
        );

        setDeleteDialogOpen(false);

        setSelectedProject(null);

        toast.success(
          "Project deleted successfully"
        );
      } catch (error) {
        toast.error(
          "Failed to delete project"
        );

        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

  // =========================
  // DUPLICATE PROJECT
  // =========================
  const handleDuplicateProject =
    async (project: any) => {
      if (!onDuplicateProject)
        return;

      setIsLoading(true);

      try {
        await onDuplicateProject(
          project.id
        );

        toast.success(
          "Project duplicated successfully"
        );
      } catch (error) {
        toast.error(
          "Failed to duplicate project"
        );

        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

  // =========================
  // COPY URL
  // =========================
  const copyProjectUrl = (
    projectId: string
  ) => {
    const url = `${window.location.origin}/playground/${projectId}`;

    navigator.clipboard.writeText(url);

    toast.success(
      "Project URL copied"
    );
  };

  return (
    <>
      {/* ========================= */}
      {/* PROJECT TABLE */}
      {/* ========================= */}

      <div className="border rounded-lg overflow-hidden w-full mt-6">
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>
                  Project
                </TableHead>

                <TableHead>
                  Template
                </TableHead>

                <TableHead>
                  Created
                </TableHead>

                <TableHead>
                  User
                </TableHead>

                <TableHead className="w-[50px] text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {projects?.map(
                (project: any) => (
                  <TableRow
                    key={project.id}
                  >
                    {/* PROJECT */}
                    <TableCell className="font-medium min-w-[300px]">
                      <div className="flex flex-col">
                        <Link
                          href={`/playground/${project.id}`}
                          className="hover:underline"
                        >
                          <span className="font-semibold">
                            {
                              project.title
                            }
                          </span>
                        </Link>

                        <span className="text-sm text-gray-500 line-clamp-1">
                          {project.description ||
                            "No description"}
                        </span>
                      </div>
                    </TableCell>

                    {/* TEMPLATE */}
                    <TableCell className="min-w-[120px]">
                      <Badge
                        variant="outline"
                        className="bg-[#E93F3F15] text-[#E93F3F] border-[#E93F3F]"
                      >
                        {
                          project.template
                        }
                      </Badge>
                    </TableCell>

                    {/* CREATED */}
                    <TableCell className="min-w-[140px]">
                      {format(
                        new Date(
                          project.createdAt
                        ),
                        "MMM d, yyyy"
                      )}
                    </TableCell>

                    {/* USER */}
                 <TableCell className="min-w-[120px]">
  <span className="text-sm">
    User
  </span>
</TableCell>

                    {/* ACTIONS */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                          align="end"
                          className="w-52"
                        >
                          {/* STAR TOGGLE */}
                          <DropdownMenuItem
                            asChild
                          >
                            <MarkedToggleButton
  markedForRevision={
    project?.Starmark?.[0]
      ?.isMarked || false
  }
  id={project.id}
/>
                          </DropdownMenuItem>

                          {/* OPEN */}
                          <DropdownMenuItem
                            asChild
                          >
                            <Link
                              href={`/playground/${project.id}`}
                              className="flex items-center"
                            >
                              <Eye className="h-4 w-4 mr-2" />

                              Open Project
                            </Link>
                          </DropdownMenuItem>

                          {/* NEW TAB */}
                          <DropdownMenuItem
                            asChild
                          >
                            <Link
                              href={`/playground/${project.id}`}
                              target="_blank"
                              className="flex items-center"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />

                              Open in New Tab
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          {/* EDIT */}
                          <DropdownMenuItem
                            onClick={() =>
                              handleEditClick(
                                project
                              )
                            }
                          >
                            <Edit3 className="h-4 w-4 mr-2" />

                            Edit Project
                          </DropdownMenuItem>

                          {/* DUPLICATE */}
                          <DropdownMenuItem
                            onClick={() =>
                              handleDuplicateProject(
                                project
                              )
                            }
                          >
                            <Copy className="h-4 w-4 mr-2" />

                            Duplicate
                          </DropdownMenuItem>

                          {/* COPY URL */}
                          <DropdownMenuItem
                            onClick={() =>
                              copyProjectUrl(
                                project.id
                              )
                            }
                          >
                            <Download className="h-4 w-4 mr-2" />

                            Copy URL
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          {/* DELETE */}
                          <DropdownMenuItem
                            onClick={() =>
                              handleDeleteClick(
                                project
                              )
                            }
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />

                            Delete Project
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* ========================= */}
      {/* EDIT DIALOG */}
      {/* ========================= */}

      <Dialog
        open={editDialogOpen}
        onOpenChange={
          setEditDialogOpen
        }
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Edit Project
            </DialogTitle>

            <DialogDescription>
              Make changes to your
              project details here.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">
                Project Title
              </Label>

              <Input
                id="title"
                value={editData.title}
                onChange={(e) =>
                  setEditData(
                    (prev) => ({
                      ...prev,
                      title:
                        e.target.value,
                    })
                  )
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">
                Description
              </Label>

              <Textarea
                id="description"
                value={
                  editData.description
                }
                onChange={(e) =>
                  setEditData(
                    (prev) => ({
                      ...prev,
                      description:
                        e.target.value,
                    })
                  )
                }
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setEditDialogOpen(
                  false
                )
              }
            >
              Cancel
            </Button>

            <Button
              onClick={
                handleUpdateProject
              }
              disabled={
                isLoading
              }
            >
              {isLoading
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ========================= */}
      {/* DELETE DIALOG */}
      {/* ========================= */}

      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={
          setDeleteDialogOpen
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete Project
            </AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want
              to delete "
              {
                selectedProject?.title
              }
              "?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={
                handleDeleteProject
              }
              className="bg-destructive text-white"
            >
              {isLoading
                ? "Deleting..."
                : "Delete Project"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
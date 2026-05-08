"use client";

import Link from "next/link";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProjectDialogsContext } from "@/components/editor/project-dialogs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { EditorProjectSummary } from "@/lib/projects";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  const {
    ownedProjects,
    sharedProjects,
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
  } = useProjectDialogsContext();

  return (
    <>
      <button
        type="button"
        aria-label="Close sidebar"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-bg-base/70 backdrop-blur-sm transition-opacity md:hidden",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 transform flex-col border-r border-border bg-bg-surface shadow-xl transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
          <h2 className="text-lg font-semibold text-text-primary">Projects</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-hidden p-4">
          <Tabs defaultValue="my-projects" className="flex h-full flex-col gap-4">
            <TabsList className="w-full">
              <TabsTrigger value="my-projects" className="flex-1">
                My Projects
              </TabsTrigger>
              <TabsTrigger value="shared" className="flex-1">
                Shared
              </TabsTrigger>
            </TabsList>
            <TabsContent value="my-projects" className="min-h-0 flex-1">
              <ProjectList
                projects={ownedProjects}
                emptyMessage="No projects yet."
                onRename={openRenameDialog}
                onDelete={openDeleteDialog}
              />
            </TabsContent>
            <TabsContent value="shared" className="min-h-0 flex-1">
              <ProjectList
                projects={sharedProjects}
                emptyMessage="No shared projects."
              />
            </TabsContent>
          </Tabs>
        </div>

        <div className="border-t border-border p-4">
          <Button
            className="w-full justify-start px-3"
            variant="outline"
            onClick={openCreateDialog}
          >
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  );
}

interface ProjectListProps {
  projects: EditorProjectSummary[];
  emptyMessage: string;
  onRename?: (project: EditorProjectSummary) => void;
  onDelete?: (project: EditorProjectSummary) => void;
}

function ProjectList({
  projects,
  emptyMessage,
  onRename,
  onDelete,
}: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center py-12 text-sm text-text-muted">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 overflow-y-auto pr-1">
      {projects.map((project) => (
        <div
          key={project.id}
          className="group flex min-h-16 items-center gap-2 rounded-xl border border-border bg-bg-elevated px-3 py-2"
        >
          <Link href={`/editor/${project.id}`} className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-text-primary">
              {project.name}
            </p>
            <p className="truncate font-mono text-xs text-text-muted">
              {project.roomId}
            </p>
            <p className="mt-1 text-xs text-text-faint">{project.updatedAt}</p>
          </Link>

          {project.access === "owner" && onRename && onDelete ? (
            <div className="flex shrink-0 items-center gap-1 opacity-100 md:opacity-0 md:transition-opacity md:group-hover:opacity-100 md:group-focus-within:opacity-100">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => onRename(project)}
                aria-label={`Rename ${project.name}`}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => onDelete(project)}
                aria-label={`Delete ${project.name}`}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

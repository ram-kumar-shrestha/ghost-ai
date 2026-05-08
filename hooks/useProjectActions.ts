"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { EditorProjectSummary } from "@/lib/projects";

export type ProjectDialogType = "create" | "rename" | "delete";

interface UseProjectActionsOptions {
  ownedProjects: EditorProjectSummary[];
  sharedProjects: EditorProjectSummary[];
}

interface ProjectMutationResponse {
  project?: {
    id: string;
    name: string;
  };
  error?: string;
}

function slugify(value: string) {
  return (
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "untitled-project"
  );
}

function createShortSuffix() {
  const bytes = new Uint8Array(3);
  crypto.getRandomValues(bytes);

  return Array.from(bytes, (byte) => byte.toString(36).padStart(2, "0"))
    .join("")
    .slice(0, 6);
}

async function readProjectMutationResponse(response: Response) {
  const body = (await response.json()) as ProjectMutationResponse;

  if (!response.ok) {
    throw new Error(body.error ?? "Project mutation failed");
  }

  return body;
}

export function useProjectActions({
  ownedProjects,
  sharedProjects,
}: UseProjectActionsOptions) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeDialog, setActiveDialog] = useState<ProjectDialogType | null>(
    null
  );
  const [selectedProject, setSelectedProject] =
    useState<EditorProjectSummary | null>(null);
  const [projectName, setProjectName] = useState("");
  const [createSuffix, setCreateSuffix] = useState(createShortSuffix);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const roomIdPreview = useMemo(() => {
    if (activeDialog === "rename" && selectedProject) {
      return selectedProject.roomId;
    }

    return `${slugify(projectName)}-${createSuffix}`;
  }, [activeDialog, createSuffix, projectName, selectedProject]);

  function closeDialog() {
    if (isLoading) {
      return;
    }

    resetDialog();
  }

  function resetDialog() {
    setActiveDialog(null);
    setSelectedProject(null);
    setProjectName("");
    setErrorMessage(null);
  }

  function openCreateDialog() {
    setSelectedProject(null);
    setProjectName("");
    setCreateSuffix(createShortSuffix());
    setErrorMessage(null);
    setActiveDialog("create");
  }

  function openRenameDialog(project: EditorProjectSummary) {
    setSelectedProject(project);
    setProjectName(project.name);
    setErrorMessage(null);
    setActiveDialog("rename");
  }

  function openDeleteDialog(project: EditorProjectSummary) {
    setSelectedProject(project);
    setProjectName("");
    setErrorMessage(null);
    setActiveDialog("delete");
  }

  async function createProject() {
    const name = projectName.trim();

    if (!name) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const body = await readProjectMutationResponse(
        await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: roomIdPreview, name }),
        })
      );

      const projectId = body.project?.id ?? roomIdPreview;

      setActiveDialog(null);
      setSelectedProject(null);
      setProjectName("");
      router.push(`/editor/${projectId}`);
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Project creation failed"
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function renameProject() {
    const name = projectName.trim();

    if (!name || !selectedProject) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      await readProjectMutationResponse(
        await fetch(`/api/projects/${selectedProject.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        })
      );

      resetDialog();
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Project rename failed"
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteProject() {
    if (!selectedProject) {
      return;
    }

    const deletedProjectId = selectedProject.id;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      await readProjectMutationResponse(
        await fetch(`/api/projects/${deletedProjectId}`, {
          method: "DELETE",
        })
      );

      resetDialog();

      if (pathname === `/editor/${deletedProjectId}`) {
        router.push("/editor");
      } else {
        router.refresh();
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Project deletion failed"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return {
    ownedProjects,
    sharedProjects,
    activeDialog,
    selectedProject,
    projectName,
    roomIdPreview,
    isLoading,
    errorMessage,
    setProjectName,
    closeDialog,
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    createProject,
    renameProject,
    deleteProject,
  };
}

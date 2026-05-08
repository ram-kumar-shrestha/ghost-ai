"use client";

import { useMemo, useState } from "react";

export interface ProjectSummary {
  id: string;
  name: string;
  slug: string;
  updatedAt: string;
  access: "owner" | "collaborator";
}

export type ProjectDialogType = "create" | "rename" | "delete";

const MOCK_PROJECTS: ProjectSummary[] = [
  {
    id: "proj-system-mapper",
    name: "System Mapper",
    slug: "system-mapper",
    updatedAt: "Updated today",
    access: "owner",
  },
  {
    id: "proj-checkout-redesign",
    name: "Checkout Redesign",
    slug: "checkout-redesign",
    updatedAt: "Updated yesterday",
    access: "owner",
  },
  {
    id: "proj-observability-stack",
    name: "Observability Stack",
    slug: "observability-stack",
    updatedAt: "Shared project",
    access: "collaborator",
  },
];

function slugify(value: string) {
  return (
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "untitled-project"
  );
}

export function useProjectDialogs() {
  const [projects, setProjects] = useState<ProjectSummary[]>(MOCK_PROJECTS);
  const [activeDialog, setActiveDialog] = useState<ProjectDialogType | null>(
    null
  );
  const [selectedProject, setSelectedProject] =
    useState<ProjectSummary | null>(null);
  const [projectName, setProjectName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const ownedProjects = useMemo(
    () => projects.filter((project) => project.access === "owner"),
    [projects]
  );
  const sharedProjects = useMemo(
    () => projects.filter((project) => project.access === "collaborator"),
    [projects]
  );
  const slugPreview = slugify(projectName);

  function closeDialog() {
    if (isLoading) {
      return;
    }

    setActiveDialog(null);
    setSelectedProject(null);
    setProjectName("");
  }

  function openCreateDialog() {
    setSelectedProject(null);
    setProjectName("");
    setActiveDialog("create");
  }

  function openRenameDialog(project: ProjectSummary) {
    setSelectedProject(project);
    setProjectName(project.name);
    setActiveDialog("rename");
  }

  function openDeleteDialog(project: ProjectSummary) {
    setSelectedProject(project);
    setActiveDialog("delete");
  }

  function createProject() {
    const name = projectName.trim();

    if (!name) {
      return;
    }

    setIsLoading(true);
    const slug = slugify(name);

    setProjects((currentProjects) => [
      {
        id: `proj-${slug}-${Date.now()}`,
        name,
        slug,
        updatedAt: "Just now",
        access: "owner",
      },
      ...currentProjects,
    ]);
    setIsLoading(false);
    closeDialog();
  }

  function renameProject() {
    const name = projectName.trim();

    if (!name || !selectedProject) {
      return;
    }

    setIsLoading(true);
    const slug = slugify(name);

    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === selectedProject.id
          ? {
              ...project,
              name,
              slug,
              updatedAt: "Just now",
            }
          : project
      )
    );
    setIsLoading(false);
    closeDialog();
  }

  function deleteProject() {
    if (!selectedProject) {
      return;
    }

    setIsLoading(true);
    setProjects((currentProjects) =>
      currentProjects.filter((project) => project.id !== selectedProject.id)
    );
    setIsLoading(false);
    closeDialog();
  }

  return {
    projects,
    ownedProjects,
    sharedProjects,
    activeDialog,
    selectedProject,
    projectName,
    slugPreview,
    isLoading,
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

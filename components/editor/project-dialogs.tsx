"use client";

import {
  createContext,
  type ReactNode,
  type SubmitEvent,
  useContext,
} from "react";
import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProjectDialogs } from "@/lib/hooks/useProjectDialogs";

type ProjectDialogsValue = ReturnType<typeof useProjectDialogs>;

const ProjectDialogsContext = createContext<ProjectDialogsValue | null>(null);

export function useProjectDialogsContext() {
  const context = useContext(ProjectDialogsContext);

  if (!context) {
    throw new Error(
      "useProjectDialogsContext must be used within ProjectDialogsProvider"
    );
  }

  return context;
}

export function ProjectDialogsProvider({ children }: { children: ReactNode }) {
  const dialogs = useProjectDialogs();

  return (
    <ProjectDialogsContext.Provider value={dialogs}>
      {children}
      <ProjectDialogs />
    </ProjectDialogsContext.Provider>
  );
}

function ProjectDialogs() {
  const dialogs = useProjectDialogsContext();
  const isDialogOpen = dialogs.activeDialog !== null;
  const isCreateDialog = dialogs.activeDialog === "create";
  const isRenameDialog = dialogs.activeDialog === "rename";
  const isDeleteDialog = dialogs.activeDialog === "delete";
  const projectName = dialogs.selectedProject?.name;
  const dialogTitle = isCreateDialog
    ? "Create project"
    : isRenameDialog
      ? "Rename project"
      : "Delete project";
  const dialogDescription = isCreateDialog
    ? "Name the architecture workspace you want to start."
    : isRenameDialog
      ? `Current project: ${projectName ?? ""}`
      : `Delete ${projectName ?? "this project"}? This mock action cannot be undone in the current session.`;

  function handleProjectFormSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isCreateDialog) {
      dialogs.createProject();
      return;
    }

    if (isRenameDialog) {
      dialogs.renameProject();
    }
  }

  if (!isDialogOpen) {
    return (
      <Dialog
        open={false}
        onOpenChange={(open) => {
          if (!open) {
            dialogs.closeDialog();
          }
        }}
      />
    );
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          dialogs.closeDialog();
        }
      }}
    >
      <DialogContent className="rounded-3xl border border-border bg-bg-surface p-6 sm:max-w-md">
        {isDeleteDialog ? (
          <div className="grid gap-5">
            <DialogHeader>
              <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <DialogTitle className="text-text-primary">
                {dialogTitle}
              </DialogTitle>
              <DialogDescription className="text-text-muted">
                {dialogDescription}
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="-mx-6 -mb-6 rounded-b-3xl border-border bg-bg-elevated px-6">
              <Button
                type="button"
                variant="outline"
                onClick={dialogs.closeDialog}
                disabled={dialogs.isLoading}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={dialogs.deleteProject}
                disabled={dialogs.isLoading}
              >
                Delete project
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={handleProjectFormSubmit} className="grid gap-5">
            <DialogHeader>
              <DialogTitle className="text-text-primary">
                {dialogTitle}
              </DialogTitle>
              <DialogDescription className="text-text-muted">
                {dialogDescription}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-2">
              <label
                htmlFor="project-name"
                className="text-sm font-medium text-text-secondary"
              >
                Project name
              </label>
              <Input
                id="project-name"
                value={dialogs.projectName}
                onChange={(event) => dialogs.setProjectName(event.target.value)}
                placeholder={isCreateDialog ? "Payment Platform" : undefined}
                autoFocus
              />
              <p className="font-mono text-xs text-accent-primary">
                {dialogs.slugPreview}
              </p>
            </div>

            <DialogFooter className="-mx-6 -mb-6 rounded-b-3xl border-border bg-bg-elevated px-6">
              <Button
                type="button"
                variant="outline"
                onClick={dialogs.closeDialog}
                disabled={dialogs.isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!dialogs.projectName.trim() || dialogs.isLoading}
              >
                {isCreateDialog ? "Create project" : "Save name"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProjectDialogsContext } from "@/components/editor/project-dialogs";

export default function Editor() {
  const { openCreateDialog } = useProjectDialogsContext();

  return (
    <main className="flex min-h-0 flex-1 bg-background">
      <section className="flex flex-1 items-center justify-center bg-bg-base px-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold text-text-primary">
            Create a project or open an existing one
          </h1>
          <p className="mt-3 text-sm leading-6 text-text-muted">
            Start a new architecture workspace, or choose a project from the
            sidebar.
          </p>
          <Button className="mt-6" onClick={openCreateDialog}>
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </section>
    </main>
  );
}

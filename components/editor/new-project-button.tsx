"use client";

import { Plus } from "lucide-react";
import { useProjectDialogsContext } from "@/components/editor/project-dialogs";
import { Button } from "@/components/ui/button";

export function NewProjectButton() {
  const { openCreateDialog } = useProjectDialogsContext();

  return (
    <Button className="mt-6" onClick={openCreateDialog}>
      <Plus className="h-4 w-4" />
      New Project
    </Button>
  );
}

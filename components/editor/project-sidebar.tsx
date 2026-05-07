"use client";

import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 transform bg-background border-r border-border transition-transform duration-300 ease-in-out flex flex-col shadow-xl",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-14 items-center justify-between px-4 border-b border-border shrink-0">
        <h2 className="text-lg font-semibold">Projects</h2>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close sidebar">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-hidden p-4">
        <Tabs defaultValue="my-projects" className="flex flex-col gap-4">
          <TabsList className="w-full">
            <TabsTrigger value="my-projects" className="flex-1">My Projects</TabsTrigger>
            <TabsTrigger value="shared" className="flex-1">Shared</TabsTrigger>
          </TabsList>
          <TabsContent value="my-projects" className="flex-1">
            <div className="flex h-full flex-col items-center justify-center text-muted-foreground text-sm py-12">
              <p>No projects yet.</p>
            </div>
          </TabsContent>
          <TabsContent value="shared" className="flex-1">
            <div className="flex h-full flex-col items-center justify-center text-muted-foreground text-sm py-12">
              <p>No shared projects.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="p-4 border-t border-border">
        <Button className="w-full justify-start px-3" variant="outline">
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>
    </aside>
  );
}

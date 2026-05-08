import { prisma } from "@/lib/prisma";

export interface EditorProjectSummary {
  id: string;
  name: string;
  roomId: string;
  updatedAt: string;
  access: "owner" | "collaborator";
}

export interface EditorProjectLists {
  ownedProjects: EditorProjectSummary[];
  sharedProjects: EditorProjectSummary[];
}

export const projectSelect = {
  id: true,
  ownerId: true,
  name: true,
  description: true,
  status: true,
  canvasJsonPath: true,
  createdAt: true,
  updatedAt: true,
} as const;

function formatUpdatedAt(updatedAt: Date) {
  return `Updated ${updatedAt.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;
}

export function toEditorProjectSummary(
  project: { id: string; name: string; updatedAt: Date },
  access: EditorProjectSummary["access"],
): EditorProjectSummary {
  return {
    id: project.id,
    name: project.name,
    roomId: project.id,
    updatedAt: formatUpdatedAt(project.updatedAt),
    access,
  };
}

export async function getEditorProjectLists({
  userId,
  email,
}: {
  userId: string;
  email?: string | null;
}): Promise<EditorProjectLists> {
  const [ownedProjects, sharedProjectRecords] = await Promise.all([
    prisma.project.findMany({
      where: { ownerId: userId },
      orderBy: { updatedAt: "desc" },
      select: projectSelect,
    }),
    email
      ? prisma.project.findMany({
          where: {
            collaborators: {
              some: { email },
            },
            NOT: { ownerId: userId },
          },
          orderBy: { updatedAt: "desc" },
          select: projectSelect,
        })
      : Promise.resolve([]),
  ]);

  return {
    ownedProjects: ownedProjects.map((project) =>
      toEditorProjectSummary(project, "owner")
    ),
    sharedProjects: sharedProjectRecords.map((project) =>
      toEditorProjectSummary(project, "collaborator")
    ),
  };
}

import { auth } from "@clerk/nextjs/server";

import { prisma } from "@/lib/prisma";
import { projectSelect } from "@/lib/projects";

interface ProjectRouteContext {
  params: Promise<{
    projectId: string;
  }>;
}

interface RenameProjectBody {
  name?: unknown;
}

const parseRenameProjectBody = async (
  request: Request,
): Promise<RenameProjectBody> => {
  const body: unknown = await request.json();

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return {};
  }

  return body;
};

const getProjectOwnership = async (projectId: string) => {
  return prisma.project.findUnique({
    where: { id: projectId },
    select: { ownerId: true },
  });
};

export async function PATCH(
  request: Request,
  context: ProjectRouteContext,
) {
  const { isAuthenticated, userId } = await auth();

  if (!isAuthenticated || !userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { projectId } = await context.params;
  const project = await getProjectOwnership(projectId);

  if (!project) {
    return Response.json({ error: "Project not found" }, { status: 404 });
  }

  if (project.ownerId !== userId) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: RenameProjectBody;

  try {
    body = await parseRenameProjectBody(request);
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof body.name !== "string" || !body.name.trim()) {
    return Response.json({ error: "Project name is required" }, { status: 400 });
  }

  const updatedProject = await prisma.project.update({
    where: { id: projectId },
    data: { name: body.name.trim() },
    select: projectSelect,
  });

  return Response.json({ project: updatedProject });
}

export async function DELETE(
  _request: Request,
  context: ProjectRouteContext,
) {
  const { isAuthenticated, userId } = await auth();

  if (!isAuthenticated || !userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { projectId } = await context.params;
  const project = await getProjectOwnership(projectId);

  if (!project) {
    return Response.json({ error: "Project not found" }, { status: 404 });
  }

  if (project.ownerId !== userId) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.project.delete({
    where: { id: projectId },
  });

  return Response.json({ deleted: true });
}

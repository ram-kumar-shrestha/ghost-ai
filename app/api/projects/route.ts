import { auth } from "@clerk/nextjs/server";

import { prisma } from "@/lib/prisma";
import { projectSelect } from "@/lib/projects";

const DEFAULT_PROJECT_NAME = "Untitled Project";
const ROOM_ID_PATTERN = /^[a-z0-9][a-z0-9-]{2,80}$/;

interface CreateProjectBody {
  id?: unknown;
  name?: unknown;
}

const parseCreateProjectBody = async (
  request: Request,
): Promise<CreateProjectBody> => {
  if (!request.body) {
    return {};
  }

  const body: unknown = await request.json();

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return {};
  }

  return body;
};

const normalizeProjectName = (name: unknown) => {
  if (typeof name !== "string") {
    return DEFAULT_PROJECT_NAME;
  }

  const trimmedName = name.trim();

  return trimmedName || DEFAULT_PROJECT_NAME;
};

const normalizeProjectId = (id: unknown) => {
  if (typeof id !== "string") {
    return undefined;
  }

  const trimmedId = id.trim();

  if (!ROOM_ID_PATTERN.test(trimmedId)) {
    return null;
  }

  return trimmedId;
};

export async function GET() {
  const { isAuthenticated, userId } = await auth();

  if (!isAuthenticated || !userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projects = await prisma.project.findMany({
    where: { ownerId: userId },
    orderBy: { updatedAt: "desc" },
    select: projectSelect,
  });

  return Response.json({ projects });
}

export async function POST(request: Request) {
  const { isAuthenticated, userId } = await auth();

  if (!isAuthenticated || !userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: CreateProjectBody;

  try {
    body = await parseCreateProjectBody(request);
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const projectId = normalizeProjectId(body.id);

  if (projectId === null) {
    return Response.json({ error: "Invalid project ID" }, { status: 400 });
  }

  const project = await prisma.project.create({
    data: {
      id: projectId,
      ownerId: userId,
      name: normalizeProjectName(body.name),
    },
    select: projectSelect,
  });

  return Response.json({ project }, { status: 201 });
}

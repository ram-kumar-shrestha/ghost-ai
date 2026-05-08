import { auth, currentUser } from "@clerk/nextjs/server";
import { EditorShell } from "@/components/editor/editor-shell";
import { getEditorProjectLists } from "@/lib/projects";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();
  const user = userId ? await currentUser() : null;
  const email = user?.primaryEmailAddress?.emailAddress ?? null;
  const projectLists = userId
    ? await getEditorProjectLists({ userId, email })
    : { ownedProjects: [], sharedProjects: [] };

  return <EditorShell {...projectLists}>{children}</EditorShell>;
}

export default async function ProjectWorkspace({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  return (
    <main className="flex min-h-0 flex-1 bg-bg-base">
      <section className="flex flex-1 items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="font-mono text-xs text-text-muted">{projectId}</p>
          <h1 className="mt-3 text-2xl font-semibold text-text-primary">
            Project workspace
          </h1>
          <p className="mt-3 text-sm leading-6 text-text-muted">
            The collaborative canvas will be wired into this workspace in a
            later feature.
          </p>
        </div>
      </section>
    </main>
  );
}

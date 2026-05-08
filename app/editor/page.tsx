import { NewProjectButton } from "@/components/editor/new-project-button";

export default function Editor() {
  return (
    <main className="flex min-h-0 flex-1 bg-bg-base">
      <section className="flex flex-1 items-center justify-center bg-bg-base px-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold text-text-primary">
            Create a project or open an existing one
          </h1>
          <p className="mt-3 text-sm leading-6 text-text-muted">
            Start a new architecture workspace, or choose a project from the
            sidebar.
          </p>
          <NewProjectButton />
        </div>
      </section>
    </main>
  );
}

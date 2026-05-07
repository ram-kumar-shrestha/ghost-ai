import { ReactNode } from "react";
import { Layout, Sparkles, FileText } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Left panel - Visible on md and up */}
      <div className="hidden md:flex flex-col justify-between w-1/2 bg-bg-surface p-12 border-r border-border">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-accent-primary" />
          <span className="text-lg font-bold tracking-tight text-text-primary">
            ghost AI
          </span>
        </div>

        <div className="max-w-sm space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-text-primary leading-tight">
              Real-time collaborative system design.
            </h1>
            <p className="text-text-secondary text-lg">
              Describe your architecture in plain English and let AI map it onto
              a shared canvas.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-primary-dim">
                <Layout className="h-5 w-5 text-accent-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-text-primary">Collaborative Canvas</h3>
                <p className="text-sm text-text-faint">Work together in real-time with live presence and cursors.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-primary-dim">
                <Sparkles className="h-5 w-5 text-accent-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-text-primary">AI Architecture Generation</h3>
                <p className="text-sm text-text-faint">Turn natural language prompts into structured architecture graphs.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-primary-dim">
                <FileText className="h-5 w-5 text-accent-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-text-primary">Automated Specs</h3>
                <p className="text-sm text-text-faint">Convert your visual designs into professional Markdown technical specs.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-xs text-text-muted">&copy; 2026 ghost AI</div>
      </div>

      {/* Right panel - Centered form */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 bg-background border-l border-border">
        <div className="mb-8 md:hidden flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-accent-primary" />
          <span className="text-lg font-bold tracking-tight text-text-primary">
            ghost AI
          </span>
        </div>
        <div className="w-full flex justify-center">{children}</div>
      </div>
    </div>
  );
}

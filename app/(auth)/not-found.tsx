"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      d {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-6xl font-black text-text-primary mb-4 italic">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-text-primary mb-2">
          Page Not Found
        </h2>
        <p className="text-text-faint max-w-md mb-8">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="px-6 py-2 bg-accent-primary text-bg-base font-bold rounded-lg hover:opacity-90 transition-opacity"
        >
          Back to Home
        </Link>
      </main>
      {/* Footer */}
      <footer className="p-4 text-center border-t border-border">
        <span className="text-xs text-text-faint">&copy; 2026 ghost AI</span>
      </footer>
    </div>
  );
}

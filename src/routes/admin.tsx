import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, FileText, Loader2, LogOut, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fetchLatestResume, RESUME_BUCKET, type ResumeRecord } from "@/lib/resume";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Resume Manager" },
      { name: "description", content: "Private area to update the published resume file." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Admin — Resume Manager" },
      { property: "og:description", content: "Private resume management area." },
    ],
  }),
  component: AdminPage,
});

const MAX_BYTES = 5 * 1024 * 1024;

function AdminPage() {
  const [checking, setChecking] = useState(true);
  const [session, setSession] = useState<unknown>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [needsBootstrap, setNeedsBootstrap] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    supabase.rpc("admin_exists").then(({ data }) => setNeedsBootstrap(data === false));
    return () => sub.subscription.unsubscribe();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAuthError(null);
    setBusy(true);
    const fn = needsBootstrap
      ? supabase.auth.signUp({ email, password })
      : supabase.auth.signInWithPassword({ email, password });
    const { error } = await fn;
    setBusy(false);
    if (error) {
      setAuthError(error.message);
      return;
    }
    setNeedsBootstrap(false);
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-sm rounded-2xl border border-border bg-card p-7"
        >
          <h1 className="text-xl font-semibold text-foreground">
            {needsBootstrap ? "Create admin account" : "Admin sign in"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {needsBootstrap
              ? "No admin exists yet. The first account created becomes the owner."
              : "Private area. Authorised access only."}
          </p>

          <label className="mt-6 block text-xs font-medium text-muted-foreground" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />

          <label className="mt-4 block text-xs font-medium text-muted-foreground" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />

          {authError && <p className="mt-3 text-sm text-destructive">{authError}</p>}

          <button
            type="submit"
            disabled={busy}
            className="mt-6 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
          >
            {busy ? "Please wait…" : needsBootstrap ? "Create account" : "Sign in"}
          </button>
        </form>
      </main>
    );
  }

  return <ResumeManager />;
}

function ResumeManager() {
  const [current, setCurrent] = useState<ResumeRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function refresh() {
    setCurrent(await fetchLatestResume());
    setLoading(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setSuccess(null);

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setError("Only PDF files are allowed.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("File is too large. Maximum size is 5 MB.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setUploading(true);
    const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const { error: uploadError } = await supabase.storage
      .from(RESUME_BUCKET)
      .upload(path, file, { contentType: "application/pdf", upsert: false });

    if (uploadError) {
      setUploading(false);
      setError(uploadError.message);
      return;
    }

    const { data: userData } = await supabase.auth.getUser();
    const { error: insertError } = await supabase.from("resumes").insert({
      file_name: file.name,
      storage_path: path,
      uploaded_by: userData.user?.id ?? null,
    });

    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setSuccess(`${file.name} is now the live resume.`);
    refresh();
  }

  return (
    <main className="min-h-screen bg-background px-4 py-16">
      <div className="mx-auto w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Resume manager</h1>
          <button
            onClick={() => supabase.auth.signOut()}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition hover:border-primary/60 hover:text-primary"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-sm font-semibold text-muted-foreground">Current resume</h2>
          {loading ? (
            <p className="mt-3 text-sm text-muted-foreground">Loading…</p>
          ) : current ? (
            <div className="mt-3 flex items-start gap-3">
              <FileText className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">{current.file_name}</p>
                <p className="text-xs text-muted-foreground">
                  Uploaded {new Date(current.uploaded_at).toLocaleString()}
                </p>
              </div>
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              No resume uploaded yet — the site is serving the original bundled PDF.
            </p>
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-sm font-semibold text-muted-foreground">Upload a new resume</h2>
          <p className="mt-1 text-xs text-muted-foreground">PDF only · max 5 MB</p>
          <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-primary/50 px-4 py-6 text-sm font-medium text-primary transition hover:bg-primary/10">
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            {uploading ? "Uploading…" : "Choose PDF file"}
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              disabled={uploading}
              onChange={onUpload}
            />
          </label>

          {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
          {success && (
            <p className="mt-4 flex items-center gap-2 text-sm text-primary">
              <CheckCircle2 className="h-4 w-4" /> {success}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type ResumeRecord = {
  id: string;
  file_name: string;
  storage_path: string;
  uploaded_at: string;
};

export const RESUME_BUCKET = "resumes";

export async function fetchLatestResume(): Promise<ResumeRecord | null> {
  const { data, error } = await supabase
    .from("resumes")
    .select("id, file_name, storage_path, uploaded_at")
    .order("uploaded_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) return null;
  return (data as ResumeRecord | null) ?? null;
}

export async function createResumeUrl(storagePath: string): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from(RESUME_BUCKET)
    .createSignedUrl(storagePath, 60 * 60, { download: true });
  if (error) return null;
  return data?.signedUrl ?? null;
}

/** Latest uploaded resume link, falling back to the bundled PDF. */
export function useResumeLink(fallbackUrl: string, fallbackName: string) {
  const [url, setUrl] = useState(fallbackUrl);
  const [fileName, setFileName] = useState(fallbackName);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const latest = await fetchLatestResume();
      if (!latest || cancelled) return;
      const signed = await createResumeUrl(latest.storage_path);
      if (!signed || cancelled) return;
      setUrl(signed);
      setFileName(latest.file_name);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { url, fileName };
}

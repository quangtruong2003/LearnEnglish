"use client";
import { useEffect, useState, useCallback } from "react";
import { defaultProgress, readProgress, writeProgress, type Progress } from "./progressStore";

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(defaultProgress);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProgress(readProgress());
    setHydrated(true);
  }, []);

  const update = useCallback((mut: (p: Progress) => Progress) => {
    setProgress((prev) => {
      const next = mut(prev);
      writeProgress(next);
      return next;
    });
  }, []);

  return { progress, update, hydrated };
}

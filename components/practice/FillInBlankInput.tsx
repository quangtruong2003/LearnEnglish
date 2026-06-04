"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function FillInBlankInput({ onSubmit, disabled }: { onSubmit: (v: string) => void; disabled?: boolean }) {
  const [v, setV] = useState("");
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (v.trim()) onSubmit(v); }}
      className="flex gap-2"
    >
      <Input value={v} onChange={(e) => setV(e.target.value)} placeholder="Nhập đáp án…" autoFocus disabled={disabled} />
      <button type="submit" className="underline text-sm" disabled={disabled || !v.trim()}>OK</button>
    </form>
  );
}

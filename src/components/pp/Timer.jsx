import React, { useEffect, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function Timer({ minutes }) {
  const { t } = useLang();
  const total = Math.round(minutes * 60);
  const [left, setLeft] = useState(total);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setLeft((s) => (s <= 1 ? (setRunning(false), 0) : s - 1)), 1000);
    return () => clearInterval(id);
  }, [running]);

  const r = 88, c = 2 * Math.PI * r;
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  return (
    <div className="bg-card rounded-3xl border border-border p-6 md:p-8 text-center">
      <h2 className="font-heading text-2xl font-semibold">{t("timer")}</h2>
      <div className="relative w-52 h-52 mx-auto my-6">
        <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
          <circle cx="100" cy="100" r={r} fill="none" stroke="hsl(var(--muted))" strokeWidth="12" />
          <circle cx="100" cy="100" r={r} fill="none" stroke="hsl(var(--primary))" strokeWidth="12" strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={c * (1 - left / total)} style={{ transition: "stroke-dashoffset 1s linear" }} />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <span className="text-5xl font-bold tabular-nums">{left === 0 ? "✓" : `${mm}:${ss}`}</span>
        </div>
      </div>
      {left === 0 && <p className="text-xl font-bold text-primary mb-4">{t("done")}</p>}
      <div className="flex gap-3 justify-center">
        <button onClick={() => left > 0 && setRunning(!running)} disabled={left === 0}
          className="flex-1 max-w-[12rem] inline-flex items-center justify-center gap-2 h-16 rounded-full bg-primary text-primary-foreground text-xl font-bold disabled:opacity-40">
          {running ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          {running ? t("pause") : t("start")}
        </button>
        <button onClick={() => { setRunning(false); setLeft(total); }} aria-label={t("reset")}
          className="inline-flex items-center justify-center gap-2 h-16 px-6 rounded-full border-2 border-border text-lg font-bold hover:border-primary">
          <RotateCcw className="w-5 h-5" /> {t("reset")}
        </button>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, PartyPopper } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { store, dayKey, calcStreak } from "@/lib/storage";
import { useExercises } from "@/lib/useExercises";
import { useMyProfile } from "@/lib/social";
import TodayChecklist from "@/components/pp/TodayChecklist";
import LevelSlider from "@/components/pp/LevelSlider";
import DiscomfortChart from "@/components/pp/DiscomfortChart";
import Badges from "@/components/pp/Badges";

export default function Progress() {
  const { t } = useLang();
  const plan = store.getPlan();
  const { data: exercises = [] } = useExercises();
  const { profile, save: saveProfile } = useMyProfile();
  const [log, setLog] = useState(store.getLog());
  const today = dayKey();
  const entry = log[today] || { done: [] };
  const [rating, setRating] = useState(entry.rating ?? 5);
  const [saved, setSaved] = useState(false);

  const planEx = plan?.status === "ok" ? plan.items.map((i) => exercises.find((e) => e.id === i.id)).filter(Boolean) : [];
  const planIds = planEx.map((e) => e.id);
  const allDone = planEx.length > 0 && planIds.every((id) => entry.done.includes(id));
  const totalDone = Object.values(log).reduce((s, e) => s + (e.done?.length || 0), 0);

  const syncProfile = (nextLog) => {
    if (!profile) return;
    saveProfile.mutate({
      id: profile.id,
      streak: calcStreak(nextLog, planIds),
      today_done: (nextLog[today]?.done || []).length,
      today_total: planIds.length,
      last_active: today,
    });
  };
  useEffect(() => {
    if (profile?.id) syncProfile(log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.id]);

  const update = (patch) => {
    const next = { ...log, [today]: { done: [], ...log[today], ...patch } };
    setLog(next);
    store.setLog(next);
    syncProfile(next);
  };
  const toggle = (id) => { update({ done: entry.done.includes(id) ? entry.done.filter((x) => x !== id) : [...entry.done, id] }); setSaved(false); };
  const save = () => { update({ rating }); setSaved(true); };

  return (
    <div className="max-w-3xl mx-auto px-5 py-10 md:py-14 space-y-6">
      <h1 className="font-heading text-4xl md:text-5xl font-semibold">{t("progTitle")}</h1>

      <div className="bg-primary text-primary-foreground rounded-3xl p-6 md:p-8 flex items-center gap-5">
        <Flame className="w-12 h-12 shrink-0" />
        <div>
          <p className="text-5xl font-bold tabular-nums">{calcStreak(log, planIds)} <span className="text-2xl">{t("streak")}</span></p>
          <p className="text-lg opacity-90 mt-1">{t("streakHint")}</p>
        </div>
      </div>

      {allDone && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
          className="bg-accent border-2 border-primary/30 rounded-3xl p-6 flex items-center gap-4">
          <PartyPopper className="w-10 h-10 text-primary shrink-0" />
          <p className="text-2xl font-bold">{t("allDoneToday")}</p>
        </motion.div>
      )}

      <Badges streak={calcStreak(log, planIds)} totalDone={totalDone} />

      {planEx.length > 0 ? (
        <TodayChecklist exercises={planEx} done={entry.done} onToggle={toggle} />
      ) : (
        <div className="bg-card rounded-3xl border border-border p-6 md:p-8">
          <p className="text-xl">{t("noPlanText")}</p>
          <Link to="/start" className="inline-flex mt-5 h-14 px-8 items-center rounded-full bg-primary text-primary-foreground text-lg font-bold">{t("start")}</Link>
        </div>
      )}

      <div className="bg-card rounded-3xl border border-border p-6 md:p-8">
        <h2 className="font-heading text-2xl font-semibold mb-5">{t("ratingTitle")}</h2>
        <LevelSlider value={rating} onChange={(v) => { setRating(v); setSaved(false); }} />
        <button onClick={save} className="mt-5 w-full h-16 rounded-full bg-primary text-primary-foreground text-xl font-bold">
          {saved ? `✓ ${t("saved")}` : t("save")}
        </button>
      </div>

      <DiscomfortChart log={log} />
    </div>
  );
}
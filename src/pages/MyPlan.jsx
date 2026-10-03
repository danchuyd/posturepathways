import React from "react";
import { Link } from "react-router-dom";
import { HeartPulse, Info, ClipboardList } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { store } from "@/lib/storage";
import { useExercises } from "@/lib/useExercises";
import ExerciseCard from "@/components/pp/ExerciseCard";
import NoticeCard from "@/components/pp/NoticeCard";

const btn = "inline-flex items-center justify-center h-16 px-10 rounded-full text-xl font-bold";

export default function MyPlan() {
  const { t } = useLang();
  const plan = store.getPlan();
  const { data: exercises = [], isLoading } = useExercises();

  if (!plan)
    return (
      <div className="max-w-2xl mx-auto px-5 py-16 text-center">
        <ClipboardList className="w-14 h-14 mx-auto text-primary" />
        <h1 className="font-heading text-4xl font-semibold mt-6">{t("noPlanTitle")}</h1>
        <p className="text-xl text-muted-foreground mt-4">{t("noPlanText")}</p>
        <Link to="/start" className={`${btn} mt-10 bg-primary text-primary-foreground`}>{t("start")}</Link>
      </div>
    );

  if (plan.status === "safety")
    return (
      <div className="max-w-2xl mx-auto px-5 py-12 md:py-16">
        <NoticeCard icon={HeartPulse} title={t("safetyTitle")} tone="blue">{t("safetyText")}</NoticeCard>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link to="/exercises" className={`${btn} bg-primary text-primary-foreground`}>{t("goExercises")}</Link>
          <Link to="/start" className={`${btn} border-2 border-border bg-card`}>{t("retake")}</Link>
        </div>
      </div>
    );

  const items = plan.items.map((i) => ({ ...i, ex: exercises.find((e) => e.id === i.id) })).filter((i) => i.ex);
  const mins = items.reduce((s, i) => s + i.ex.duration_minutes, 0);

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14">
      <h1 className="font-heading text-4xl md:text-5xl font-semibold">{t("planTitle")}</h1>
      {!isLoading && <p className="text-xl text-muted-foreground mt-3">{t("planIntro", items.length, mins)}</p>}
      {(plan.diagnosed || plan.gentleOnly) && (
        <div className="mt-8">
          <NoticeCard icon={Info}>{plan.diagnosed ? t("diagNote") : t("gentleNote")}</NoticeCard>
        </div>
      )}
      {isLoading ? (
        <p className="text-xl mt-10">{t("loading")}</p>
      ) : (
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((i, idx) => <ExerciseCard key={i.id} index={idx} exercise={i.ex} reason={t(`reason_${i.area}`)} />)}
        </div>
      )}
      <div className="mt-12 text-center">
        <Link to="/start" className="text-lg font-bold text-primary underline underline-offset-4">{t("retake")}</Link>
      </div>
    </div>
  );
}
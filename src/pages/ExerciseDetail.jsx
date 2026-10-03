import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, OctagonAlert, BookOpen } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLang } from "@/lib/i18n";
import { useExercises } from "@/lib/useExercises";
import Timer from "@/components/pp/Timer";
import VideoPlayer from "@/components/pp/VideoPlayer";
import NoticeCard from "@/components/pp/NoticeCard";

export default function ExerciseDetail() {
  const { id } = useParams();
  const { t, tx } = useLang();
  const { data: exercises, isLoading } = useExercises();
  const ex = exercises?.find((e) => e.id === id);

  if (isLoading) return <p className="text-xl max-w-5xl mx-auto px-5 py-12">{t("loading")}</p>;
  if (!ex) return <p className="text-xl max-w-5xl mx-auto px-5 py-12">{t("notFound")}</p>;

  const facts = [
    ["duration", `${ex.duration_minutes} ${t("minutes")}`],
    ["reps", tx(ex, "reps")],
    ["difficulty", t(ex.difficulty)],
    ["bodyArea", t(`area_${ex.area}`)],
  ];

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-8 md:py-12">
      <Link to="/exercises" className="inline-flex items-center gap-2 text-lg font-bold text-primary">
        <ArrowLeft className="w-5 h-5" /> {t("backToList")}
      </Link>
      <h1 className="font-heading text-4xl md:text-5xl font-semibold mt-6">{tx(ex, "name")}</h1>
      <dl className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {facts.map(([k, v]) => (
          <div key={k} className="bg-card rounded-2xl border border-border p-4">
            <dt className="text-base text-muted-foreground">{t(k)}</dt>
            <dd className="text-lg font-bold mt-1">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="rounded-3xl overflow-hidden bg-muted aspect-[4/3]">
            <Image src={ex.image_url} alt={tx(ex, "name")} className="w-full h-full" />
          </div>
          <Timer key={ex.id} minutes={ex.duration_minutes} />
          <VideoPlayer url={ex.video_url} />
        </div>
        <div className="space-y-6">
          <div className="bg-card rounded-3xl border border-border p-6 md:p-8">
            <h2 className="font-heading text-2xl font-semibold">{t("steps")}</h2>
            <ol className="mt-5 space-y-5">
              {(tx(ex, "steps") || []).slice(0, 5).map((s, i) => (
                <li key={i} className="flex gap-4">
                  <span className="shrink-0 w-10 h-10 rounded-full bg-secondary text-primary text-lg font-bold grid place-items-center">{i + 1}</span>
                  <span className="text-xl leading-relaxed pt-1">{s}</span>
                </li>
              ))}
            </ol>
          </div>
          <NoticeCard icon={OctagonAlert} title={t("stopIf")}>{tx(ex, "stop_if")}</NoticeCard>
          <div className="flex gap-3 items-start text-lg px-2">
            <BookOpen className="w-6 h-6 text-muted-foreground shrink-0 mt-0.5" />
            <p><span className="font-bold">{t("source")}: </span>
              {ex.source_url ? (
                <a href={ex.source_url} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4 break-words">{ex.source || ex.source_url}</a>
              ) : (!ex.source || ex.source === "To be added" ? t("toBeAdded") : ex.source)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
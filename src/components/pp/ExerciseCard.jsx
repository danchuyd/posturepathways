import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLang } from "@/lib/i18n";
import { AREA_STYLE } from "@/lib/areas";
import Chip from "@/components/pp/Chip";

export default function ExerciseCard({ exercise, reason, index = 0 }) {
  const { t, tx } = useLang();
  const style = AREA_STYLE[exercise.area] || AREA_STYLE.neck;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group bg-card rounded-3xl border border-border overflow-hidden flex flex-col transition-shadow duration-500 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="h-1.5" style={{}} >
        <div className={`h-full ${style.bar}`} />
      </div>
      <div className="aspect-[4/3] bg-muted overflow-hidden">
        <Image src={exercise.image_url} alt={tx(exercise, "name")} className="w-full h-full transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2">
          <Chip icon={Clock}>{exercise.duration_minutes} {t("min")}</Chip>
          <Chip tone={exercise.difficulty === "gentle" ? "gray" : "beige"}>{t(exercise.difficulty)}</Chip>
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-[0.9rem] font-bold ${style.chip}`}>{t(`area_${exercise.area}`)}</span>
        </div>
        <h3 className="font-heading text-2xl font-semibold mt-4 leading-snug">{tx(exercise, "name")}</h3>
        {reason && <p className="mt-3 text-base bg-secondary/60 rounded-xl px-4 py-3">{reason}</p>}
        <Link to={`/exercises/${exercise.id}`} className="mt-auto pt-6">
          <span className="flex items-center justify-center gap-2 h-14 rounded-full bg-primary text-primary-foreground text-lg font-bold transition-all group-hover:gap-3">
            {t("start")} <ArrowRight className="w-5 h-5" />
          </span>
        </Link>
      </div>
    </motion.div>
  );
}
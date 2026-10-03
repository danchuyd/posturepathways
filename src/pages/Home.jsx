const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShieldAlert } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useLang } from "@/lib/i18n";
import NoticeCard from "@/components/pp/NoticeCard";

const HERO = "https://media.db.com/images/public/6ab77565f2bce191ba849564/ece90a0df_generated_image.png";

export default function Home() {
  const { t } = useLang();
  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h1 className="font-heading text-4xl md:text-6xl font-semibold leading-[1.1]">{t("heroTitle")}</h1>
          <p className="mt-6 text-xl md:text-2xl text-muted-foreground leading-relaxed">{t("heroText")}</p>
          <Link to="/start" className="mt-10 inline-flex items-center gap-3 h-[4.5rem] px-12 rounded-full bg-primary text-primary-foreground text-2xl font-bold shadow-lg shadow-primary/20 transition-all duration-300 hover:gap-5 hover:shadow-xl">
            {t("start")} <ArrowRight className="w-7 h-7" />
          </Link>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15 }}
          className="rounded-[2rem] overflow-hidden bg-secondary aspect-square">
          <Image src={HERO} alt="" className="w-full h-full" />
        </motion.div>
      </div>

      <motion.ol initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.7 }}
        className="mt-16 grid sm:grid-cols-3 gap-4">
        {["how1", "how2", "how3"].map((k, i) => (
          <li key={k} className="bg-card rounded-3xl border border-border p-6 flex items-center gap-4">
            <span className="shrink-0 w-12 h-12 rounded-full bg-secondary text-primary text-xl font-bold grid place-items-center">{i + 1}</span>
            <span className="text-xl font-bold">{t(k)}</span>
          </li>
        ))}
      </motion.ol>

      <div className="mt-10">
        <NoticeCard icon={ShieldAlert} title={t("disclaimerTitle")}>{t("disclaimer")}</NoticeCard>
      </div>
    </div>
  );
}
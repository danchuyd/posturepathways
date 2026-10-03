import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "@/components/pp/TopBar";
import StartOverButton from "@/components/pp/StartOverButton";
import EnsureProfile from "@/components/pp/EnsureProfile";
import { useLang } from "@/lib/i18n";

export default function Layout() {
  const { t } = useLang();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <EnsureProfile />
      <main className="flex-1">
        <Outlet />
      </main>
      {/* keep main wrapper intact */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">{t("disclaimer")}</p>
          <StartOverButton />
        </div>
      </footer>
    </div>
  );
}
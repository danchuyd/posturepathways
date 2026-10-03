import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Home, ClipboardList, Dumbbell, LineChart, Users, Sprout } from "lucide-react";
import { useLang } from "@/lib/i18n";
import LangToggle from "@/components/pp/LangToggle";

const LINKS = [
  ["/", "navHome", Home],
  ["/plan", "navPlan", ClipboardList],
  ["/exercises", "navExercises", Dumbbell],
  ["/progress", "navProgress", LineChart],
  ["/friends", "navFriends", Users],
];

export default function TopBar() {
  const { t } = useLang();
  const cls = ({ isActive }) =>
    `transition-all duration-300 rounded-xl ${isActive ? "bg-secondary text-primary font-bold" : "text-foreground hover:bg-muted"}`;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between gap-4 h-20">
          <Link to="/" className="flex items-center gap-3 min-w-0">
            <span className="shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground grid place-items-center">
              <Sprout className="w-6 h-6" />
            </span>
            <span className="font-heading text-2xl font-semibold truncate">{t("appName")}</span>
          </Link>
          <nav className="hidden md:flex gap-1">
            {LINKS.map(([to, key]) => (
              <NavLink key={to} to={to} end={to === "/"} className={(s) => `${cls(s)} px-5 py-3 text-lg`}>
                {t(key)}
              </NavLink>
            ))}
          </nav>
          <LangToggle />
        </div>
        <nav className="md:hidden grid grid-cols-5 gap-1 pb-3">
          {LINKS.map(([to, key, Icon]) => (
            <NavLink key={to} to={to} end={to === "/"} className={(s) => `${cls(s)} flex flex-col items-center gap-1.5 py-2.5 text-base`}>
              <Icon className="w-7 h-7" />
              {t(key)}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
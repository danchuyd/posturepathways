import React from "react";

const TONES = {
  blue: "bg-secondary text-secondary-foreground",
  beige: "bg-accent text-accent-foreground",
  gray: "bg-muted text-foreground",
};

export default function Chip({ tone = "blue", icon: Icon, children }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.9rem] font-bold ${TONES[tone]}`}>
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </span>
  );
}
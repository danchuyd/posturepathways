import React from "react";

export default function NoticeCard({ icon: Icon, title, children, tone = "beige" }) {
  const bg = tone === "beige" ? "bg-accent border-accent-foreground/15" : "bg-secondary border-primary/20";
  return (
    <div className={`rounded-3xl border p-6 md:p-8 flex gap-4 ${bg}`} role="note">
      {Icon && <Icon className="w-8 h-8 shrink-0 text-primary mt-0.5" />}
      <div>
        {title && <h2 className="font-heading text-2xl font-semibold mb-2">{title}</h2>}
        <div className="text-xl leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
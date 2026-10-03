import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useLang } from "@/lib/i18n";

export default function DiscomfortChart({ log }) {
  const { t } = useLang();
  const data = Object.keys(log)
    .filter((k) => typeof log[k].rating === "number")
    .sort()
    .map((k) => ({ date: k.slice(5).replace("-", "/"), rating: log[k].rating }));

  return (
    <div className="bg-card rounded-3xl border border-border p-6 md:p-8">
      <h2 className="font-heading text-2xl font-semibold mb-6">{t("chartTitle")}</h2>
      {data.length === 0 ? (
        <p className="text-lg text-muted-foreground py-10 text-center">{t("chartEmpty")}</p>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ left: -20, right: 10, top: 10 }}>
              <CartesianGrid stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 15, fill: "hsl(var(--foreground))" }} />
              <YAxis domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} tick={{ fontSize: 15, fill: "hsl(var(--foreground))" }} />
              <Tooltip contentStyle={{ fontSize: 16, borderRadius: 12 }} />
              <Line type="monotone" dataKey="rating" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
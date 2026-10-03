const SENIOR = ["60-69", "70-79", "80+"];

export function buildPlan(answers, exercises) {
  if (answers.safety.some((s) => s !== "none")) return { status: "safety" };

  const diagnosed = answers.diagnosed === "yes";
  const gentleOnly = diagnosed || SENIOR.includes(answers.age);
  const level = (a) => answers.levels[a] ?? 5;
  const areas = [...answers.areas].sort((a, b) => level(b) - level(a));
  const pools = Object.fromEntries(
    areas.map((a) => [
      a,
      exercises
        .filter((e) => e.area === a && e.duration_minutes <= 5 && (!gentleOnly || e.difficulty === "gentle"))
        .sort((x, y) => (x.order ?? 0) - (y.order ?? 0)),
    ])
  );

  const target = areas.length === 1 ? 3 : 4;
  const items = [];
  let total = 0;
  let added = true;
  while (items.length < target && added) {
    added = false;
    for (const a of areas) {
      if (items.length >= target) break;
      const ex = pools[a].find((e) => !items.some((i) => i.id === e.id) && total + e.duration_minutes <= 20);
      if (ex) {
        items.push({ id: ex.id, area: a });
        total += ex.duration_minutes;
        added = true;
      }
    }
  }
  return { status: "ok", diagnosed, gentleOnly, items };
}
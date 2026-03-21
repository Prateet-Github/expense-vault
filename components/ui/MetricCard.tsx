export function MetricCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: "emerald" | "zinc";
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition group hover:scale-[1.01]">
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
          color === "emerald"
            ? "bg-emerald-500 text-black"
            : "bg-zinc-800 text-emerald-500"
        }`}
      >
        {icon}
      </div>

      <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">
        {title}
      </p>

      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}

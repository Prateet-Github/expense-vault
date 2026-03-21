export function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-5 sm:p-6 rounded-xl hover:border-emerald-500/40 transition group">
      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-emerald-500 text-black rounded-lg mb-4 group-hover:scale-110 transition">
        {icon}
      </div>

      <h4 className="text-base sm:text-lg font-semibold mb-2">{title}</h4>
      <p className="text-zinc-400 text-sm">{desc}</p>
    </div>
  );
}

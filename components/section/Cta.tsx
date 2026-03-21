import Link from "next/link";

const Cta = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto bg-emerald-600 text-black p-6 sm:p-10 md:p-16 rounded-3xl">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start lg:items-center justify-between">
          <div className="text-left max-w-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4">
              Ready to take control of your finances?
            </h2>

            <p className="text-black/80 text-sm sm:text-base">
              Track every expense, understand your spending patterns, and build
              smarter financial habits with a system designed for clarity and
              long-term growth.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="bg-black text-emerald-500 px-6 sm:px-8 py-3 rounded-xl font-bold hover:scale-105 transition w-full sm:w-auto text-center"
          >
            Get Started →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cta;

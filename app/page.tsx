export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-zinc-500">
          STELIS
        </p>

        <h1 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
          The Apple of restaurant operating systems.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
          A premium AI command center built to help restaurant owners understand
          what happened, what needs attention, and what to do next.
        </p>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
          <p className="text-sm text-zinc-400">Today&apos;s priorities</p>

          <div className="mt-5 space-y-4">
            <div className="rounded-2xl bg-white/10 p-4">
              Produce 4 recipes of beans before 10:00 AM
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              Review supplier payments due this week
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              Check cash flow before approving new purchases
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
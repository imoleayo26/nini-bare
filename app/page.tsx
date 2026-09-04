export default function Home() {
  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-16 sm:px-10 lg:px-16">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-neutral-500">
            Nini Bare
          </p>

          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Everyday style,
            <br />
            beautifully made.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
            Modern fashion and lifestyle essentials designed for comfort,
            confidence, and everyday living.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800">
              Shop collection
            </button>

            <button className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50">
              Explore Nini Bare
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

const categories = [
  {
    name: "Women",
    description: "Everyday pieces with a soft, confident feel.",
  },
  {
    name: "Men",
    description: "Clean essentials made for everyday living.",
  },
  {
    name: "Lingerie",
    description: "Comfortable intimates with effortless style.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-nb-white text-nb-ink">
      {/* Announcement */}
      <div className="bg-nb-berry px-4 py-2 text-center text-xs font-medium tracking-wide text-nb-blush">
        Welcome to Nini Bare — style made for everyday confidence.
      </div>

      {/* Header */}
      <header className="border-b border-nb-border bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <a
            href="#"
            className="text-xl font-semibold tracking-[0.12em] text-nb-berry"
          >
            NINI BARE
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#shop" className="transition hover:text-nb-rose">
              Shop
            </a>
            <a href="#categories" className="transition hover:text-nb-rose">
              Categories
            </a>
            <a href="#story" className="transition hover:text-nb-rose">
              Our Story
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              aria-label="Search"
              className="rounded-full p-2 transition hover:bg-nb-blush"
            >
              ⌕
            </button>

            <button
              aria-label="Shopping bag"
              className="rounded-full p-2 transition hover:bg-nb-blush"
            >
              ♡
            </button>

            <button
              aria-label="Shopping cart"
              className="rounded-full bg-nb-berry px-4 py-2 text-xs font-semibold text-white transition hover:bg-nb-rose"
            >
              Bag
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-nb-blush">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-nb-rose">
              Nini Bare
            </p>

            <h1 className="mt-5 max-w-xl text-5xl font-semibold leading-[1.05] tracking-tight text-nb-berry sm:text-6xl lg:text-7xl">
              Everyday style,
              <br />
              beautifully made.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-nb-ink/70 sm:text-lg">
              Discover modern fashion and lifestyle essentials designed around
              comfort, confidence, and the way you live every day.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#shop"
                className="rounded-full bg-nb-berry px-6 py-3 text-sm font-semibold text-white transition hover:bg-nb-rose"
              >
                Shop collection
              </a>

              <a
                href="#categories"
                className="rounded-full border border-nb-berry/20 bg-white px-6 py-3 text-sm font-semibold text-nb-berry transition hover:bg-nb-white"
              >
                Explore categories
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] bg-nb-berry p-8 shadow-sm sm:p-12">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-nb-gold/20 blur-3xl" />

            <div className="relative flex min-h-[360px] flex-col justify-between">
              <div>
                <span className="inline-flex rounded-full border border-nb-gold/40 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-nb-gold">
                  New collection
                </span>

                <h2 className="mt-8 max-w-sm text-4xl font-semibold leading-tight text-white sm:text-5xl">
                  Feel good.
                  <br />
                  Look good.
                  <br />
                  Be you.
                </h2>
              </div>

              <p className="max-w-sm text-sm leading-6 text-nb-blush/80">
                A growing collection of pieces selected for modern everyday
                living.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-nb-rose">
              Explore
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-nb-berry sm:text-4xl">
              Shop your way
            </h2>
          </div>

          <a
            href="#shop"
            className="text-sm font-semibold text-nb-rose hover:text-nb-berry"
          >
            View all products →
          </a>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {categories.map((category, index) => (
            <a
              key={category.name}
              href="#shop"
              className={`group min-h-64 rounded-3xl p-7 transition hover:-translate-y-1 ${
                index === 0
                  ? "bg-nb-blush"
                  : index === 1
                    ? "bg-nb-rose text-white"
                    : "bg-nb-berry text-white"
              }`}
            >
              <div className="flex h-full flex-col justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] opacity-70">
                  0{index + 1}
                </span>

                <div>
                  <h3 className="text-2xl font-semibold">{category.name}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-6 opacity-75">
                    {category.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Product area */}
      <section id="shop" className="bg-nb-blush px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-nb-rose">
            Featured
          </p>

          <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className="text-3xl font-semibold tracking-tight text-nb-berry sm:text-4xl">
              Your next favourite piece
            </h2>

            <p className="max-w-md text-sm leading-6 text-nb-ink/60">
              Products will appear here as we connect the storefront to the
              Nini Bare product database.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="aspect-[4/5] rounded-3xl border border-nb-border bg-white"
              >
                <div className="flex h-full items-end p-5">
                  <div>
                    <div className="h-3 w-20 rounded-full bg-nb-border" />
                    <div className="mt-3 h-3 w-28 rounded-full bg-nb-border" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-nb-gold">
          The Nini Bare feeling
        </p>

        <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-nb-berry sm:text-5xl">
          Simple pieces. Personal style. Everyday confidence.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-nb-ink/65">
          Nini Bare is growing into a fashion and lifestyle destination where
          comfort meets expression — from everyday essentials to pieces that
          make you feel a little more like yourself.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-nb-berry px-5 py-10 text-nb-blush sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold tracking-[0.12em] text-white">
              NINI BARE
            </p>
            <p className="mt-2 text-xs text-nb-blush/60">
              Modern fashion & lifestyle essentials.
            </p>
          </div>

          <p className="text-xs text-nb-blush/50">
            © {new Date().getFullYear()} Nini Bare. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

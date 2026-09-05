export default function Header() {
  return (
    <header className="border-b border-nb-border bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a
          href="/"
          className="text-xl font-semibold tracking-[0.12em] text-nb-berry"
        >
          NINI BARE
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <a
            href="/shop"
            className="transition hover:text-nb-rose"
          >
            Shop
          </a>

          <a
            href="/categories"
            className="transition hover:text-nb-rose"
          >
            Categories
          </a>

          <a
            href="/our-story"
            className="transition hover:text-nb-rose"
          >
            Our Story
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Search"
            className="rounded-full p-2 text-sm transition hover:bg-nb-blush"
          >
            ⌕
          </button>

          <button
            type="button"
            aria-label="Wishlist"
            className="rounded-full p-2 text-sm transition hover:bg-nb-blush"
          >
            ♡
          </button>

          <button
            type="button"
            aria-label="Shopping bag"
            className="rounded-full bg-nb-berry px-4 py-2 text-xs font-semibold text-white transition hover:bg-nb-rose"
          >
            Bag
          </button>
        </div>
      </div>
    </header>
  );
}

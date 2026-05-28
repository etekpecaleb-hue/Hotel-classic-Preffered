import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ImageCarousel from "../components/ImageCarousel";
import { usePageReveal } from "../hooks/useReveal";
import { IMG, ROOMS } from "../data/images";

type Category = "All" | "Signature Suite" | "Presidential Suite" | "Heritage Room" | "Deluxe Room" | "Junior Suite" | "Loft Suite";

export default function Rooms() {
  usePageReveal();
  const [cat, setCat] = useState<Category>("All");

  const categories: Category[] = [
    "All",
    "Presidential Suite",
    "Signature Suite",
    "Junior Suite",
    "Loft Suite",
    "Heritage Room",
    "Deluxe Room",
  ];

  const filtered = useMemo(
    () => (cat === "All" ? ROOMS : ROOMS.filter((r) => r.category === cat)),
    [cat]
  );

  return (
    <div>
      {/* Hero carousel */}
      <ImageCarousel
        slides={[
          { image: IMG.room4, eyebrow: "Suites & Chambres", title: "Residences of Quiet Majesty." },
          { image: IMG.room2, eyebrow: "The Collection", title: "Where heritage meets modern grace." },
          { image: IMG.room5, eyebrow: "Private Sanctuaries", title: "A room for every manner of dream." },
        ]}
        heightClass="h-[75vh] min-h-[520px]"
      />

      {/* Intro */}
      <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto text-center fade-up">
        <div className="font-display text-[0.7rem] tracking-[0.45em] gold-text mb-4 uppercase">— Our Rooms</div>
        <h1 className="font-italiana text-4xl md:text-6xl text-[color:var(--ivory)] leading-tight">Suites & Chambres</h1>
        <div className="divider-ornament my-8">
          <span className="font-serif-classic italic text-[color:var(--champagne)]">Each residence, a masterwork</span>
        </div>
        <p className="font-serif-classic text-lg md:text-xl text-[color:var(--cream)]/80 max-w-3xl mx-auto leading-relaxed">
          Six extraordinary residences compose our collection — from the opulent Emperor Grand Suite to the intimate Crown Jewel Room. Each is appointed with hand-loomed silks, curated antiquities, and the quiet devotion of a dedicated butler.
        </p>
      </section>

      {/* Filters */}
      <section className="px-6 md:px-12 max-w-[1600px] mx-auto mb-12 fade-up">
        <div className="flex flex-wrap justify-center gap-3 border-y border-gold-subtle py-6">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`font-display text-[0.7rem] tracking-[0.28em] uppercase px-5 py-2.5 border transition-all ${
                cat === c
                  ? "bg-gradient-to-r from-[#b8935a] to-[#d4af37] text-[color:var(--ink)] border-[color:var(--gold-bright)]"
                  : "border-gold-subtle text-[color:var(--champagne)] hover:border-[color:var(--gold-bright)] hover:text-[color:var(--gold-bright)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Rooms grid with details */}
      <section className="px-6 md:px-12 max-w-[1600px] mx-auto pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
          {filtered.map((r) => (
            <article key={r.id} className="room-card group flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={r.image} alt={r.name} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,6,0.9)] via-transparent to-transparent" />
                <div className="absolute top-5 left-5 font-display text-[0.62rem] tracking-[0.35em] gold-text bg-[rgba(10,8,6,0.7)] backdrop-blur px-3 py-1.5 border border-gold-subtle uppercase">
                  {r.category}
                </div>
              </div>
              <div className="p-7 flex-1 flex flex-col border-t border-gold-subtle">
                <h3 className="font-italiana text-3xl text-[color:var(--ivory)]">{r.name}</h3>
                <div className="flex items-center gap-3 mt-3 text-sm font-serif-classic text-[color:var(--champagne)]">
                  <span>{r.size}</span>
                  <span className="w-1 h-1 bg-[color:var(--gold)] rounded-full" />
                  <span>{r.guests}</span>
                </div>
                <p className="font-serif-classic text-[color:var(--cream)]/75 mt-4 leading-relaxed flex-1">{r.description}</p>
                <ul className="flex flex-wrap gap-2 mt-5">
                  {r.amenities.slice(0, 4).map((a) => (
                    <li key={a} className="text-[0.68rem] font-display tracking-[0.2em] uppercase text-[color:var(--champagne)] border border-gold-subtle px-2.5 py-1">
                      {a}
                    </li>
                  ))}
                </ul>
                <div className="flex items-end justify-between mt-6 pt-6 border-t border-gold-subtle">
                  <div>
                    <div className="font-display text-[0.6rem] tracking-[0.3em] text-[color:var(--champagne)] uppercase">From</div>
                    <div className="font-italiana text-3xl gold-text mt-1">€{r.price}<span className="text-sm text-[color:var(--champagne)]/60">/night</span></div>
                  </div>
                  <Link to={`/reservations?room=${r.id}`} className="btn-royal text-xs">Reserve</Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 font-serif-classic text-xl text-[color:var(--champagne)]">No residences match this selection.</div>
        )}
      </section>

      {/* Comparison / features */}
      <section className="py-24 bg-[#0c0a07] border-y border-gold-subtle">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16 fade-up">
            <div className="font-display text-[0.7rem] tracking-[0.45em] gold-text mb-4 uppercase">— Every Stay</div>
            <h2 className="font-italiana text-4xl md:text-5xl text-[color:var(--ivory)]">The Royal Standard</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[rgba(184,147,90,0.15)] stagger-children">
            {[
              { t: "24h Butler", d: "Dedicated personal service, day or night" },
              { t: "Michelin Dining", d: "In-suite private chef on request" },
              { t: "Private Transfer", d: "Chauffeured arrival in royal fleet" },
              { t: "Spa Access", d: "Unlimited Aurelia wellness rituals" },
              { t: "Bespoke Linens", d: "Frette & hand-loomed Egyptian cotton" },
              { t: "Heritage Tours", d: "Private viewings of the royal archive" },
              { t: "Concierge", d: "Rare access to city's hidden salons" },
              { t: "Turndown Ritual", d: "Nightly ceremony of quiet indulgence" },
            ].map((f) => (
              <div key={f.t} className="bg-[#0c0a07] p-8 text-center">
                <div className="font-display text-xs tracking-[0.3em] gold-text uppercase">{f.t}</div>
                <p className="font-serif-classic text-base text-[color:var(--cream)]/75 mt-3">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

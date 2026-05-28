import { useRef } from "react";
import { Link } from "react-router-dom";
import Hero3D from "../components/Hero3D";
import ImageCarousel from "../components/ImageCarousel";
import { usePageReveal, useSplitChars, splitChars } from "../hooks/useReveal";
import { IMG, ROOMS, AMENITIES } from "../data/images";

export default function Home() {
  usePageReveal();
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  useSplitChars(headlineRef, 0.4);

  const stats = [
    { n: "1842", l: "Founded" },
    { n: "87", l: "Suites & Chambres" },
    { n: "5★", l: "Palace Distinction" },
    { n: "14", l: "Michelin Honours" },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        {/* Background image layer */}
        <div className="absolute inset-0">
          <img
            src={IMG.heroPalace}
            alt="Royal Doves exterior"
            className="w-full h-full object-cover scale-105"
            style={{ filter: "brightness(0.55) saturate(1.05)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,8,6,0.5)] via-[rgba(10,8,6,0.25)] to-[rgba(10,8,6,0.95)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,8,6,0.7)] via-transparent to-[rgba(10,8,6,0.5)]" />
        </div>

        {/* 3D layer */}
        <Hero3D />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <div className="font-display text-[0.7rem] md:text-xs tracking-[0.55em] gold-text mb-8 uppercase">
            Maison Royale · Paris
          </div>
          <h1
            ref={headlineRef}
            className="font-italiana text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] leading-[0.95] text-[color:var(--ivory)] text-shadow-royal max-w-6xl"
          >
            {splitChars("Royal Doves")}
          </h1>
          <div className="divider-ornament mt-8 w-full max-w-md">
            <span className="font-display text-[0.7rem] tracking-[0.4em] gold-text uppercase">
              Hôtel de Légende
            </span>
          </div>
          <p className="font-serif-classic text-lg md:text-xl text-[color:var(--cream)]/90 mt-8 max-w-xl italic leading-relaxed">
            "Where every guest is received as sovereign, and every stay becomes a memory of gilded grace."
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
            <Link to="/reservations" className="btn-gold">Reserve Your Stay</Link>
            <Link to="/rooms" className="btn-royal">Discover the Suites</Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <div className="font-display text-[0.65rem] tracking-[0.4em] text-[color:var(--champagne)]">SCROLL</div>
          <div className="w-[1px] h-10 bg-gradient-to-b from-[color:var(--gold)] to-transparent" />
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="royal-grid">
          <div className="col-span-12 md:col-span-5 fade-up">
            <div className="font-display text-[0.7rem] tracking-[0.45em] gold-text mb-6 uppercase">— Our Heritage</div>
            <h2 className="font-italiana text-4xl md:text-6xl leading-[1.05] text-[color:var(--ivory)]">
              A Legacy <em className="text-[color:var(--gold-bright)] not-italic gold-text">Crafted</em> in Silence and Splendour.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 fade-up">
            <p className="font-serif-classic text-xl md:text-2xl text-[color:var(--cream)]/85 leading-relaxed">
              For nearly two centuries, <span className="gold-text">Royal Doves</span> has stood as a beacon of refined hospitality. Nestled in the heart of Paris, our maison marries the grace of the Ancien Régime with the quiet precision of modern luxury — a haven where sovereigns, statesmen, and artistes have long found repose.
            </p>
            <p className="font-serif-classic text-lg text-[color:var(--cream)]/70 mt-6 leading-relaxed">
              Every corridor whispers history. Every suite tells a story. Every guest is received as royalty.
            </p>
            <div className="mt-10 flex items-center gap-8">
              <div className="font-display text-xs tracking-[0.3em] gold-text uppercase">Since 1842</div>
              <div className="w-20 h-[1px] gold-gradient" />
              <div className="font-italiana text-sm text-[color:var(--champagne)]">Palace Distinction</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-16 border-t border-gold-subtle stagger-children">
          {stats.map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-italiana text-5xl md:text-7xl gold-text">{s.n}</div>
              <div className="font-display text-xs tracking-[0.35em] text-[color:var(--champagne)] mt-3 uppercase">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CAROUSEL - SUITES */}
      <section>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-10 fade-up">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <div className="font-display text-[0.7rem] tracking-[0.45em] gold-text mb-4 uppercase">— Nos Chambres</div>
              <h2 className="font-italiana text-4xl md:text-5xl text-[color:var(--ivory)]">Suites of Distinction</h2>
            </div>
            <Link to="/rooms" className="btn-royal">View All Suites</Link>
          </div>
        </div>
        <ImageCarousel
          slides={ROOMS.slice(0, 4).map((r) => ({
            image: r.image,
            eyebrow: r.category,
            title: r.name,
            subtitle: r.description,
            cta: { label: "Discover Suite", href: "/rooms" },
          }))}
          heightClass="h-[80vh] min-h-[580px]"
        />
      </section>

      {/* ROOMS GRID */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="text-center mb-16 fade-up">
          <div className="font-display text-[0.7rem] tracking-[0.45em] gold-text mb-4 uppercase">— Residences</div>
          <h2 className="font-italiana text-4xl md:text-6xl text-[color:var(--ivory)]">The Royal Collection</h2>
          <p className="font-serif-classic text-xl text-[color:var(--cream)]/75 mt-6 max-w-2xl mx-auto italic">
            Six extraordinary residences, each a masterwork of heritage craftsmanship and contemporary comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
          {ROOMS.map((r) => (
            <Link to="/reservations" key={r.id} className="room-card group block">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={r.image} alt={r.name} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,6,0.9)] via-transparent to-transparent" />
                <div className="absolute top-4 left-4 font-display text-[0.65rem] tracking-[0.35em] gold-text bg-[rgba(10,8,6,0.7)] backdrop-blur px-3 py-1.5 border border-gold-subtle uppercase">
                  {r.category}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="font-italiana text-2xl text-[color:var(--ivory)]">{r.name}</div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="font-serif-classic text-sm text-[color:var(--cream)]/75">{r.size} · {r.guests}</div>
                    <div className="font-display text-xs tracking-[0.2em] gold-text">
                      €{r.price}<span className="text-[color:var(--champagne)]/60">/night</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* AMENITIES TEASER */}
      <section className="py-24 md:py-32 bg-[#0c0a07] border-y border-gold-subtle">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16 fade-up">
            <div className="font-display text-[0.7rem] tracking-[0.45em] gold-text mb-4 uppercase">— L'Expérience</div>
            <h2 className="font-italiana text-4xl md:text-6xl text-[color:var(--ivory)]">The Royal Experience</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {AMENITIES.slice(0, 6).map((a, i) => (
              <div key={i} className="group relative overflow-hidden aspect-[4/5] border border-gold-subtle hover:border-[color:var(--gold-bright)] transition-all">
                <img src={a.image} alt={a.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,6,0.95)] via-[rgba(10,8,6,0.3)] to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="font-display text-[0.65rem] tracking-[0.35em] gold-text uppercase mb-2">{a.subtitle}</div>
                  <div className="font-italiana text-2xl md:text-3xl text-[color:var(--ivory)] leading-tight">{a.title}</div>
                  <p className="font-serif-classic text-base text-[color:var(--cream)]/80 mt-3 line-clamp-3">{a.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16 fade-up">
            <Link to="/experience" className="btn-gold">Explore All Experiences</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1200px] mx-auto text-center fade-up">
        <div className="font-display text-[0.7rem] tracking-[0.45em] gold-text mb-6 uppercase">— Guest Reflections</div>
        <svg className="mx-auto mb-8 w-10 h-10 text-[color:var(--gold)]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 7h4v4H7V7zm0 6h4v4H7v-4zm6-6h4v4h-4V7zm0 6h4v4h-4v-4z" opacity="0.4" />
          <path d="M9 3C6 3 4 5.5 4 8.5 4 13 9 17 9 17s5-4 5-8.5C14 5.5 12 3 9 3z" />
        </svg>
        <blockquote className="font-serif-classic text-2xl md:text-4xl text-[color:var(--ivory)] leading-relaxed italic">
          "To stay at Royal Doves is to understand what it means to be truly received. Every moment — from the whispered greeting at the porte-cochère to the last turn-down — is a masterwork of devotion."
        </blockquote>
        <div className="mt-10">
          <div className="font-display text-sm tracking-[0.3em] gold-text uppercase">Condé Nast Traveller</div>
          <div className="font-serif-classic text-base text-[color:var(--champagne)]/70 italic mt-2">— Gold List, 2024</div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src={IMG.heroFacade}
          alt="Royal Doves at dusk"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.45) saturate(1.1)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,6,0.85)] to-transparent" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 fade-up">
          <div className="font-display text-[0.7rem] tracking-[0.45em] gold-text mb-6 uppercase">— Your Invitation</div>
          <h2 className="font-italiana text-4xl md:text-6xl lg:text-7xl text-[color:var(--ivory)] text-shadow-royal max-w-4xl leading-[1.05]">
            Your chapter in our story awaits.
          </h2>
          <p className="font-serif-classic text-lg md:text-xl text-[color:var(--cream)]/85 mt-6 max-w-xl italic">
            Secure your residence within the maison. Our concierge will compose every detail to your measure.
          </p>
          <Link to="/reservations" className="btn-gold mt-10">Begin Your Reservation</Link>
        </div>
      </section>
    </div>
  );
}

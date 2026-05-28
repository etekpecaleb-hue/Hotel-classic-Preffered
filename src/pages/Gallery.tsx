import { useMemo, useState } from "react";
import { usePageReveal } from "../hooks/useReveal";
import { IMG } from "../data/images";

type Cat = "All" | "Architecture" | "Suites" | "Dining" | "Wellness" | "Grounds";

const GALLERY = [
  { src: IMG.heroPalace, cat: "Architecture", title: "Courtyard at Dusk", span: "col-span-2 row-span-2" },
  { src: IMG.heroTaj, cat: "Architecture", title: "The Grand Façade", span: "col-span-1 row-span-1" },
  { src: IMG.heroFacade, cat: "Architecture", title: "Evening Illumination", span: "col-span-1 row-span-1" },
  { src: IMG.lobby1, cat: "Architecture", title: "Marble Foyer", span: "col-span-1 row-span-2" },
  { src: IMG.lobby2, cat: "Architecture", title: "The Grand Hall", span: "col-span-1 row-span-1" },
  { src: IMG.lobbyStairs, cat: "Architecture", title: "Imperial Staircase", span: "col-span-1 row-span-1" },
  { src: IMG.lobbyOrnate, cat: "Architecture", title: "Ornate Ceilings", span: "col-span-1 row-span-1" },

  { src: IMG.room1, cat: "Suites", title: "Duchess Chamber", span: "col-span-1 row-span-1" },
  { src: IMG.room2, cat: "Suites", title: "Emperor Suite", span: "col-span-2 row-span-1" },
  { src: IMG.room3, cat: "Suites", title: "Crown Jewel Room", span: "col-span-1 row-span-1" },
  { src: IMG.room4, cat: "Suites", title: "The Royal Suite", span: "col-span-2 row-span-2" },
  { src: IMG.room5, cat: "Suites", title: "The Ivory Suite", span: "col-span-1 row-span-1" },
  { src: IMG.room6, cat: "Suites", title: "Heritage Loft", span: "col-span-1 row-span-1" },

  { src: IMG.dining1, cat: "Dining", title: "Le Jardin Doré", span: "col-span-2 row-span-2" },
  { src: IMG.dining2, cat: "Dining", title: "Wine Service", span: "col-span-1 row-span-1" },
  { src: IMG.dining3, cat: "Dining", title: "Candlelit Table", span: "col-span-1 row-span-1" },
  { src: IMG.dining4, cat: "Dining", title: "Romantic Dinner", span: "col-span-1 row-span-2" },
  { src: IMG.dining5, cat: "Dining", title: "Terrace Dining", span: "col-span-1 row-span-1" },

  { src: IMG.spa1, cat: "Wellness", title: "Aurelia Spa", span: "col-span-1 row-span-1" },
  { src: IMG.spa2, cat: "Wellness", title: "Restorative Ritual", span: "col-span-1 row-span-1" },
  { src: IMG.spa3, cat: "Wellness", title: "Wellness Treatment", span: "col-span-2 row-span-1" },
  { src: IMG.spa4, cat: "Wellness", title: "Massage Therapy", span: "col-span-1 row-span-1" },

  { src: IMG.pool1, cat: "Grounds", title: "Resort Poolside", span: "col-span-2 row-span-2" },
  { src: IMG.pool2, cat: "Grounds", title: "Rooftop Infinity", span: "col-span-1 row-span-1" },
  { src: IMG.pool3, cat: "Grounds", title: "Courtyard Pool", span: "col-span-1 row-span-1" },
  { src: IMG.pool4, cat: "Grounds", title: "Tropical Cabanas", span: "col-span-1 row-span-1" },
  { src: IMG.poolside, cat: "Grounds", title: "Infinity Vista", span: "col-span-1 row-span-1" },
  { src: IMG.service1, cat: "Grounds", title: "In-Suite Service", span: "col-span-2 row-span-1" },
];

export default function Gallery() {
  usePageReveal();
  const [cat, setCat] = useState<Cat>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const cats: Cat[] = ["All", "Architecture", "Suites", "Dining", "Wellness", "Grounds"];

  const visible = useMemo(
    () => (cat === "All" ? GALLERY : GALLERY.filter((g) => g.cat === cat)),
    [cat]
  );

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img
          src={IMG.heroPalace}
          alt="Gallery hero"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.45) saturate(1.05)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,6,0.95)] via-[rgba(10,8,6,0.3)] to-transparent" />
        <div className="absolute inset-0 flex items-end pb-16">
          <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12">
            <div className="font-display text-[0.7rem] tracking-[0.45em] gold-text mb-4 uppercase">— Galerie</div>
            <h1 className="font-italiana text-5xl md:text-7xl text-[color:var(--ivory)] text-shadow-royal leading-[1.05]">
              A Visual Chronicle
            </h1>
            <p className="font-serif-classic text-xl text-[color:var(--cream)]/85 mt-5 max-w-2xl italic">
              A curated journey through the halls, gardens, salons, and sanctuaries of the maison.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 md:px-12 max-w-[1600px] mx-auto mt-16 mb-8 fade-up">
        <div className="flex flex-wrap justify-center gap-3 border-y border-gold-subtle py-6">
          {cats.map((c) => (
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

      {/* Gallery Grid - CSS Grid masonry-style */}
      <section className="px-6 md:px-12 max-w-[1600px] mx-auto pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3 md:gap-4 stagger-children">
          {visible.map((g, i) => (
            <button
              key={g.src}
              onClick={() => setLightbox(i)}
              className={`gallery-item relative ${g.span} border border-gold-subtle hover:border-[color:var(--gold-bright)]`}
            >
              <img src={g.src} alt={g.title} loading="lazy" />
              <div className="absolute bottom-4 left-4 z-10 opacity-0 group-hover:opacity-100">
                <div className="font-display text-[0.6rem] tracking-[0.35em] gold-text uppercase">{g.cat}</div>
                <div className="font-italiana text-xl text-[color:var(--ivory)] mt-1">{g.title}</div>
              </div>
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[rgba(10,8,6,0.85)] to-transparent flex items-end p-5">
                <div>
                  <div className="font-display text-[0.6rem] tracking-[0.35em] gold-text uppercase">{g.cat}</div>
                  <div className="font-italiana text-xl text-[color:var(--ivory)] mt-1">{g.title}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-[rgba(5,4,3,0.95)] backdrop-blur-md flex items-center justify-center p-4 md:p-10 animate-[fadeIn_0.3s_ease]"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 border border-gold-subtle text-[color:var(--gold)] font-display hover:bg-[color:var(--gold)] hover:text-[color:var(--ink)] transition-colors"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          <button
            className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 border border-gold-subtle text-[color:var(--gold)] hover:bg-[color:var(--gold)] hover:text-[color:var(--ink)] transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((v) => (v !== null ? (v - 1 + visible.length) % visible.length : null));
            }}
          >
            ←
          </button>
          <button
            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 border border-gold-subtle text-[color:var(--gold)] hover:bg-[color:var(--gold)] hover:text-[color:var(--ink)] transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((v) => (v !== null ? (v + 1) % visible.length : null));
            }}
          >
            →
          </button>
          <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={visible[lightbox].src}
              alt={visible[lightbox].title}
              className="w-full h-auto max-h-[80vh] object-contain border border-gold-subtle"
            />
            <div className="text-center mt-6">
              <div className="font-display text-[0.7rem] tracking-[0.4em] gold-text uppercase">{visible[lightbox].cat}</div>
              <div className="font-italiana text-3xl text-[color:var(--ivory)] mt-2">{visible[lightbox].title}</div>
              <div className="font-serif-classic text-[color:var(--champagne)] mt-2">
                {lightbox + 1} / {visible.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import ImageCarousel from "../components/ImageCarousel";
import { usePageReveal } from "../hooks/useReveal";
import { IMG, AMENITIES } from "../data/images";

export default function Experience() {
  usePageReveal();

  const signature = [
    {
      title: "The Aurelia Spa",
      tag: "Wellness · Hammam · Thermal",
      description:
        "Descend into our subterranean sanctuary of thermal baths, aromatic hammams, and restorative rituals drawn from Roman, Ottoman, and Ayurvedic traditions. Every treatment is composed like a symphony — attuned to the body, the hour, and the season.",
      image: IMG.spa1,
      features: ["Thermal Circuit", "Gold Leaf Ritual", "Hammam Privé", "Ayurvedic Journey"],
    },
    {
      title: "Le Jardin Doré",
      tag: "Two Michelin Stars · Fine Dining",
      description:
        "Our grand dining room is a theatre of seasonal invention. Chef Aurélien Marceau presents a carte that honours terroir and tradition while composing plates of startling modernity — accompanied by a cellar of over 800 labels, curated by our head sommelier.",
      image: IMG.dining1,
      features: ["Tasting Menu", "Chef's Table", "Wine Cellar", "Private Dining"],
    },
    {
      title: "The Infinity Terrace",
      tag: "Heated Pool · Skyline Views",
      description:
        "Suspended above the Parisian rooftops, our 25-metre infinity pool is framed by private cabanas, palm courts, and uninterrupted champagne service from dawn until the last star appears.",
      image: IMG.pool2,
      features: ["25m Pool", "Private Cabanas", "Poolside Dining", "Sunset Lounge"],
    },
    {
      title: "The Sovereign Bar",
      tag: "Cocktails · Rare Spirits · Live Jazz",
      description:
        "An intimate sanctuary beneath crystal chandeliers, where our master mixologists compose bespoke elixirs from a library of 400+ rare spirits — accompanied nightly by our resident jazz quartet.",
      image: IMG.dining2,
      features: ["Bespoke Cocktails", "Rare Whiskies", "Live Jazz", "Cigar Salon"],
    },
  ];

  return (
    <div>
      {/* Hero */}
      <ImageCarousel
        slides={[
          { image: IMG.pool2, eyebrow: "L'Expérience", title: "A World Designed for Devotion." },
          { image: IMG.spa1, eyebrow: "Aurelia Wellness", title: "Rituals of Restoration." },
          { image: IMG.dining1, eyebrow: "Le Jardin Doré", title: "Where every plate tells a story." },
        ]}
        heightClass="h-[75vh] min-h-[520px]"
      />

      {/* Intro */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="royal-grid items-center">
          <div className="col-span-12 md:col-span-5 fade-up">
            <div className="font-display text-[0.7rem] tracking-[0.45em] gold-text mb-6 uppercase">— Our World</div>
            <h1 className="font-italiana text-4xl md:text-6xl text-[color:var(--ivory)] leading-[1.05]">
              The <em className="not-italic gold-text">Experience</em> of Royal Doves.
            </h1>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7 fade-up">
            <p className="font-serif-classic text-xl text-[color:var(--cream)]/85 leading-relaxed">
              Beyond our suites lies an entire universe — of thermal baths and tasting menus, private recitals and candlelit gardens. Each offering has been composed with the same care as a sonnet, the same precision as a jewel.
            </p>
          </div>
        </div>
      </section>

      {/* Signature experiences - alternating */}
      <section className="pb-12">
        {signature.map((s, i) => (
          <div key={s.title} className={`py-20 px-6 md:px-12 max-w-[1600px] mx-auto fade-up ${i % 2 === 1 ? "md:[&_.img-col]:order-2" : ""}`}>
            <div className="royal-grid items-center gap-12">
              <div className="col-span-12 md:col-span-6 img-col">
                <div className="relative aspect-[4/5] overflow-hidden border border-gold-subtle">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,6,0.3)] to-transparent" />
                </div>
              </div>
              <div className="col-span-12 md:col-span-5 md:col-start-8">
                <div className="font-display text-[0.7rem] tracking-[0.4em] gold-text mb-5 uppercase">— {s.tag}</div>
                <h2 className="font-italiana text-4xl md:text-5xl text-[color:var(--ivory)] leading-tight">{s.title}</h2>
                <p className="font-serif-classic text-lg text-[color:var(--cream)]/80 mt-6 leading-relaxed">{s.description}</p>
                <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 font-serif-classic text-base text-[color:var(--champagne)]">
                      <span className="w-6 h-[1px] gold-gradient" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="btn-royal mt-10">Reserve Experience</button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Full amenity grid */}
      <section className="py-24 bg-[#0c0a07] border-y border-gold-subtle">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16 fade-up">
            <div className="font-display text-[0.7rem] tracking-[0.45em] gold-text mb-4 uppercase">— All Services</div>
            <h2 className="font-italiana text-4xl md:text-5xl text-[color:var(--ivory)]">Every Detail, Attended</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {AMENITIES.map((a, i) => (
              <div key={i} className="group relative overflow-hidden aspect-[3/4] border border-gold-subtle hover:border-[color:var(--gold-bright)] transition-all">
                <img src={a.image} alt={a.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,6,0.95)] via-[rgba(10,8,6,0.3)] to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="font-display text-[0.65rem] tracking-[0.35em] gold-text uppercase mb-2">{a.subtitle}</div>
                  <div className="font-italiana text-2xl md:text-3xl text-[color:var(--ivory)] leading-tight">{a.title}</div>
                  <p className="font-serif-classic text-base text-[color:var(--cream)]/80 mt-3">{a.description}</p>
                  <div className="mt-5 inline-flex items-center gap-2 font-display text-[0.65rem] tracking-[0.3em] gold-text uppercase group-hover:gap-4 transition-all">
                    Learn More <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Private events */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="royal-grid items-center">
          <div className="col-span-12 md:col-span-6 fade-up">
            <div className="font-display text-[0.7rem] tracking-[0.45em] gold-text mb-4 uppercase">— Private Events</div>
            <h2 className="font-italiana text-4xl md:text-5xl text-[color:var(--ivory)] leading-tight">
              Royal Atelier — <br/> Events of Legend.
            </h2>
            <p className="font-serif-classic text-lg text-[color:var(--cream)]/80 mt-6 leading-relaxed">
              From intimate betrothals to grand diplomatic galas, our event ateliers are devoted to creating moments that will be recounted for generations. Each celebration is composed by master planners with the devotion of courtiers.
            </p>
            <ul className="mt-8 space-y-3 font-serif-classic text-lg text-[color:var(--champagne)]">
              <li className="flex items-start gap-3"><span className="w-6 h-[1px] gold-gradient mt-3" /> Weddings & Betrothal Banquets</li>
              <li className="flex items-start gap-3"><span className="w-6 h-[1px] gold-gradient mt-3" /> Diplomatic & State Functions</li>
              <li className="flex items-start gap-3"><span className="w-6 h-[1px] gold-gradient mt-3" /> Private Concerts & Cultural Evenings</li>
              <li className="flex items-start gap-3"><span className="w-6 h-[1px] gold-gradient mt-3" /> Anniversary & Milestone Galas</li>
            </ul>
            <button className="btn-royal mt-10">Enquire Privately</button>
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8 fade-up">
            <div className="relative aspect-[4/5] overflow-hidden border border-gold-subtle">
              <img src={IMG.dining4} alt="Private events" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0806] border-t border-gold-subtle mt-24">
      {/* Marquee */}
      <div className="overflow-hidden border-b border-gold-subtle py-6">
        <div className="marquee-track">
          {[...Array(2)].map((_, j) => (
            <div key={j} className="flex items-center gap-16 px-8 font-display text-[0.85rem] tracking-[0.45em] text-[color:var(--gold)] whitespace-nowrap">
              <span>· ROYAL DOVES ·</span>
              <span>EST. MDCCCXLII</span>
              <span>· FIVE DIAMONDS ·</span>
              <span>HERITAGE · HOSPITALITY · HONOUR</span>
              <span>· MAISON DE LÉGÉNDE ·</span>
              <span>PARIS · VIENNA · VENICE</span>
              <span>· THE ART OF STAYING ·</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-20 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <div className="font-display text-2xl gold-text tracking-[0.2em]">ROYAL DOVES</div>
          <div className="font-italiana text-sm text-[color:var(--champagne)] mt-2">Hôtel de Légende</div>
          <p className="font-serif-classic text-lg text-[color:var(--cream)]/80 mt-6 leading-relaxed max-w-sm">
            A timeless sanctuary where royal heritage, refined hospitality, and classic luxury converge in perfect harmony.
          </p>
          <div className="mt-8 flex items-center gap-4">
            {["Fb", "Ig", "Tw", "Pn"].map((s) => (
              <a
                key={s}
                href="#"
                className="w-10 h-10 flex items-center justify-center border border-gold-subtle text-[color:var(--gold)] text-xs font-display hover:bg-[color:var(--gold)] hover:text-[color:var(--ink)] transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 md:col-start-6">
          <div className="font-display text-xs tracking-[0.3em] gold-text mb-6">MAISON</div>
          <ul className="space-y-3 font-serif-classic text-lg">
            <li><Link to="/" className="hover:text-[color:var(--gold-bright)] transition-colors">Home</Link></li>
            <li><Link to="/rooms" className="hover:text-[color:var(--gold-bright)] transition-colors">Suites</Link></li>
            <li><Link to="/experience" className="hover:text-[color:var(--gold-bright)] transition-colors">Experience</Link></li>
            <li><Link to="/gallery" className="hover:text-[color:var(--gold-bright)] transition-colors">Gallery</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <div className="font-display text-xs tracking-[0.3em] gold-text mb-6">SERVICES</div>
          <ul className="space-y-3 font-serif-classic text-lg">
            <li><Link to="/reservations" className="hover:text-[color:var(--gold-bright)] transition-colors">Reservations</Link></li>
            <li><a href="#" className="hover:text-[color:var(--gold-bright)] transition-colors">Concierge</a></li>
            <li><a href="#" className="hover:text-[color:var(--gold-bright)] transition-colors">Private Events</a></li>
            <li><a href="#" className="hover:text-[color:var(--gold-bright)] transition-colors">Gift Cards</a></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="font-display text-xs tracking-[0.3em] gold-text mb-6">THE MAISON</div>
          <address className="not-italic font-serif-classic text-lg leading-relaxed text-[color:var(--cream)]/80">
            14 Rue de la Couronne<br />
            75008 Paris, France<br />
            <a href="tel:+33100000000" className="block mt-2 hover:text-[color:var(--gold-bright)]">+33 1 00 00 00 00</a>
            <a href="mailto:concierge@royaldoves.com" className="hover:text-[color:var(--gold-bright)]">concierge@royaldoves.com</a>
          </address>
          <form className="mt-8" onSubmit={(e) => e.preventDefault()}>
            <div className="font-display text-xs tracking-[0.3em] text-[color:var(--champagne)] mb-3">THE DISPATCH</div>
            <div className="flex border border-gold-subtle">
              <input
                type="email"
                placeholder="Your email"
                className="royal-input border-0 flex-1"
              />
              <button className="px-6 bg-gradient-to-r from-[#b8935a] to-[#d4af37] text-[color:var(--ink)] font-display text-xs tracking-[0.25em] uppercase">
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="border-t border-gold-subtle">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-display tracking-[0.25em] text-[color:var(--champagne)]/70 uppercase">
          <div>© {new Date().getFullYear()} Royal Doves Hotel — All Rights Reserved</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[color:var(--gold-bright)]">Privacy</a>
            <a href="#" className="hover:text-[color:var(--gold-bright)]">Terms</a>
            <a href="#" className="hover:text-[color:var(--gold-bright)]">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

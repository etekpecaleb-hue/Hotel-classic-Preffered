import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { gsap } from "gsap";

export default function Navbar() {
  const navRef = useRef<HTMLElement | null>(null);
  const brandRef = useRef<HTMLDivElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!brandRef.current) return;
    gsap.fromTo(
      brandRef.current.querySelectorAll(".brand-char"),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, stagger: 0.05, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  const links = [
    { to: "/", label: "Maison" },
    { to: "/rooms", label: "Suites & Chambres" },
    { to: "/experience", label: "L'Expérience" },
    { to: "/gallery", label: "Galerie" },
    { to: "/reservations", label: "Réservations" },
  ];

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[rgba(10,8,6,0.85)] backdrop-blur-md border-b border-gold-subtle py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand */}
        <NavLink to="/" className="flex items-center gap-3 group" aria-label="Royal Doves Home">
          <div className="relative w-11 h-11 flex items-center justify-center">
            <svg viewBox="0 0 64 64" className="w-full h-full" aria-hidden>
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c9a96a" />
                  <stop offset="50%" stopColor="#f2d98a" />
                  <stop offset="100%" stopColor="#b8935a" />
                </linearGradient>
              </defs>
              {/* Crown */}
              <path
                d="M10 40 L18 20 L26 32 L32 14 L38 32 L46 20 L54 40 Z"
                fill="none"
                stroke="url(#goldGrad)"
                strokeWidth="1.5"
              />
              <line x1="10" y1="40" x2="54" y2="40" stroke="url(#goldGrad)" strokeWidth="1.5" />
              <line x1="12" y1="44" x2="52" y2="44" stroke="url(#goldGrad)" strokeWidth="1" />
              {/* Doves silhouette */}
              <path
                d="M22 52 Q26 46 30 50 Q32 52 32 54 Q32 52 34 50 Q38 46 42 52"
                fill="none"
                stroke="url(#goldGrad)"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div ref={brandRef} className="leading-none">
            <div className="font-display text-[0.7rem] tracking-[0.4em] gold-text">
              {"ROYAL".split("").map((c, i) => (
                <span key={i} className="brand-char inline-block">{c}</span>
              ))}
              <span className="mx-2 text-[color:var(--gold)]">·</span>
              {"DOVES".split("").map((c, i) => (
                <span key={i} className="brand-char inline-block">{c}</span>
              ))}
            </div>
            <div className="font-italiana text-[0.6rem] text-[color:var(--champagne)] mt-1">
              HÔTEL · EST. MDCCCXLII
            </div>
          </div>
        </NavLink>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `nav-link font-display text-[0.72rem] tracking-[0.28em] uppercase transition-colors ${
                  isActive ? "text-[color:var(--gold-bright)] active" : "text-[color:var(--ivory)] hover:text-[color:var(--gold-bright)]"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <NavLink to="/reservations" className="btn-gold inline-block">
            Reserve
          </NavLink>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          <span className={`block h-[1px] w-7 bg-[color:var(--gold)] transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`block h-[1px] w-7 bg-[color:var(--gold)] transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block h-[1px] w-7 bg-[color:var(--gold)] transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile panel */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          open ? "max-h-[500px] border-t border-gold-subtle" : "max-h-0"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-4 bg-[rgba(10,8,6,0.95)]">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `font-display text-sm tracking-[0.28em] uppercase py-2 border-b border-gold-subtle ${
                  isActive ? "gold-text" : "text-[color:var(--ivory)]"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink
            to="/reservations"
            onClick={() => setOpen(false)}
            className="btn-gold text-center mt-4"
          >
            Reserve Your Stay
          </NavLink>
        </div>
      </div>
    </header>
  );
}

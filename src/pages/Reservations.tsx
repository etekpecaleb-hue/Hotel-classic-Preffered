import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { usePageReveal } from "../hooks/useReveal";
import { IMG, ROOMS } from "../data/images";

type Step = 1 | 2 | 3 | 4;

export default function Reservations() {
  usePageReveal();
  const [params] = useSearchParams();
  const preselected = params.get("room") || "";

  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    adults: 2,
    children: 0,
    roomId: preselected,
    extras: [] as string[],
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    requests: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (preselected && !form.roomId) setForm((f) => ({ ...f, roomId: preselected }));
  }, [preselected, form.roomId]);

  const room = useMemo(() => ROOMS.find((r) => r.id === form.roomId), [form.roomId]);

  const nights = useMemo(() => {
    if (!form.checkIn || !form.checkOut) return 0;
    const a = new Date(form.checkIn).getTime();
    const b = new Date(form.checkOut).getTime();
    return Math.max(0, Math.round((b - a) / (1000 * 60 * 60 * 24)));
  }, [form.checkIn, form.checkOut]);

  const subtotal = (room?.price || 0) * nights;
  const extrasTotal = form.extras.length * 120;
  const tax = Math.round((subtotal + extrasTotal) * 0.12);
  const total = subtotal + extrasTotal + tax;

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const toggleExtra = (e: string) =>
    setForm((f) => ({
      ...f,
      extras: f.extras.includes(e) ? f.extras.filter((x) => x !== e) : [...f.extras, e],
    }));

  const canNext = () => {
    if (step === 1) return !!form.checkIn && !!form.checkOut && nights > 0;
    if (step === 2) return !!form.roomId;
    if (step === 3) return !!form.firstName && !!form.lastName && !!form.email;
    if (step === 4)
      return (
        !!form.cardName &&
        form.cardNumber.replace(/\s/g, "").length >= 13 &&
        !!form.expiry &&
        !!form.cvc
      );
    return false;
  };

  if (confirmed && room) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center fade-up">
          <div className="w-20 h-20 mx-auto border-2 border-[color:var(--gold-bright)] rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-[color:var(--gold-bright)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="font-display text-[0.7rem] tracking-[0.45em] gold-text mt-8 uppercase">— Reservation Confirmed</div>
          <h1 className="font-italiana text-4xl md:text-6xl text-[color:var(--ivory)] mt-4 leading-tight">
            Your Chamber Awaits, <span className="gold-text">{form.firstName}</span>.
          </h1>
          <p className="font-serif-classic text-xl text-[color:var(--cream)]/85 mt-6 italic max-w-xl mx-auto">
            A confirmation has been dispatched to <span className="gold-text">{form.email}</span>. Our concierge will contact you within 24 hours to compose every detail of your arrival.
          </p>

          <div className="mt-12 bg-royal-panel p-8 text-left">
            <div className="font-display text-[0.65rem] tracking-[0.35em] gold-text uppercase mb-5">Reservation Summary</div>
            <div className="grid grid-cols-2 gap-4 font-serif-classic text-lg">
              <div>
                <div className="text-[color:var(--champagne)] text-sm">Residence</div>
                <div className="text-[color:var(--ivory)]">{room.name}</div>
              </div>
              <div>
                <div className="text-[color:var(--champagne)] text-sm">Guest</div>
                <div className="text-[color:var(--ivory)]">{form.firstName} {form.lastName}</div>
              </div>
              <div>
                <div className="text-[color:var(--champagne)] text-sm">Arrival</div>
                <div className="text-[color:var(--ivory)]">{form.checkIn}</div>
              </div>
              <div>
                <div className="text-[color:var(--champagne)] text-sm">Departure</div>
                <div className="text-[color:var(--ivory)]">{form.checkOut}</div>
              </div>
              <div>
                <div className="text-[color:var(--champagne)] text-sm">Duration</div>
                <div className="text-[color:var(--ivory)]">{nights} night{nights !== 1 ? "s" : ""}</div>
              </div>
              <div>
                <div className="text-[color:var(--champagne)] text-sm">Reference</div>
                <div className="text-[color:var(--ivory)] font-display tracking-widest">RD-{Math.random().toString(36).slice(2, 8).toUpperCase()}</div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gold-subtle flex items-center justify-between">
              <div className="font-display text-xs tracking-[0.3em] text-[color:var(--champagne)] uppercase">Total Charged</div>
              <div className="font-italiana text-3xl gold-text">€{total.toLocaleString()}</div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <button onClick={() => window.print()} className="btn-royal">Print Confirmation</button>
            <button onClick={() => { setConfirmed(false); setStep(1); setForm({ ...form, roomId: "", checkIn: "", checkOut: "" }); }} className="btn-gold">New Reservation</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <img
          src={IMG.lobby1}
          alt="Reservation"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.45) saturate(1.05)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,6,0.95)] via-[rgba(10,8,6,0.35)] to-transparent" />
        <div className="absolute inset-0 flex items-end pb-14">
          <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12">
            <div className="font-display text-[0.7rem] tracking-[0.45em] gold-text mb-4 uppercase">— Réservations</div>
            <h1 className="font-italiana text-5xl md:text-7xl text-[color:var(--ivory)] text-shadow-royal">Begin Your Stay</h1>
            <p className="font-serif-classic text-xl text-[color:var(--cream)]/85 mt-4 italic max-w-xl">
              Compose your stay in four simple movements. Our concierge will attend to every detail that follows.
            </p>
          </div>
        </div>
      </section>

      {/* Wizard */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Steps */}
          <div className="flex items-center justify-between mb-12 fade-up">
            {[
              { n: 1, l: "Dates" },
              { n: 2, l: "Residence" },
              { n: 3, l: "Guest" },
              { n: 4, l: "Payment" },
            ].map((s, i, arr) => (
              <div key={s.n} className="flex items-center flex-1">
                <button
                  onClick={() => s.n < step && setStep(s.n as Step)}
                  className={`flex items-center gap-3 ${s.n <= step ? "" : "opacity-40 cursor-not-allowed"}`}
                  disabled={s.n > step}
                >
                  <div className={`w-11 h-11 flex items-center justify-center border font-display text-sm tracking-widest transition-all ${
                    s.n === step ? "bg-gradient-to-br from-[#b8935a] to-[#d4af37] border-[color:var(--gold-bright)] text-[color:var(--ink)]"
                    : s.n < step ? "bg-[color:var(--ink)] border-[color:var(--gold-bright)] gold-text"
                    : "border-gold-subtle text-[color:var(--champagne)]"
                  }`}>
                    {s.n < step ? "✓" : s.n}
                  </div>
                  <div className="hidden md:block">
                    <div className="font-display text-[0.6rem] tracking-[0.35em] text-[color:var(--champagne)] uppercase">Step {s.n}</div>
                    <div className="font-italiana text-lg text-[color:var(--ivory)]">{s.l}</div>
                  </div>
                </button>
                {i < arr.length - 1 && (
                  <div className={`flex-1 h-[1px] mx-4 ${s.n < step ? "bg-[color:var(--gold-bright)]" : "bg-gold-subtle"}`} />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 fade-up">
            {/* Form area */}
            <div className="lg:col-span-8 bg-royal-panel p-8 md:p-12">
              {step === 1 && (
                <div>
                  <h2 className="font-italiana text-3xl md:text-4xl text-[color:var(--ivory)] mb-2">Select Your Dates</h2>
                  <p className="font-serif-classic text-[color:var(--cream)]/70 mb-8 italic">Choose the span of your sojourn within the maison.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-display text-[0.65rem] tracking-[0.3em] gold-text uppercase mb-3">Arrival</label>
                      <input type="date" value={form.checkIn} onChange={(e) => set("checkIn", e.target.value)} className="royal-input" />
                    </div>
                    <div>
                      <label className="block font-display text-[0.65rem] tracking-[0.3em] gold-text uppercase mb-3">Departure</label>
                      <input type="date" value={form.checkOut} onChange={(e) => set("checkOut", e.target.value)} className="royal-input" />
                    </div>
                    <div>
                      <label className="block font-display text-[0.65rem] tracking-[0.3em] gold-text uppercase mb-3">Adults</label>
                      <select value={form.adults} onChange={(e) => set("adults", +e.target.value)} className="royal-input">
                        {[1, 2, 3, 4].map((n) => <option key={n} value={n} className="bg-[#14110d]">{n}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block font-display text-[0.65rem] tracking-[0.3em] gold-text uppercase mb-3">Children</label>
                      <select value={form.children} onChange={(e) => set("children", +e.target.value)} className="royal-input">
                        {[0, 1, 2, 3].map((n) => <option key={n} value={n} className="bg-[#14110d]">{n}</option>)}
                      </select>
                    </div>
                  </div>
                  {nights > 0 && (
                    <div className="mt-8 p-5 border border-gold-subtle bg-[rgba(184,147,90,0.05)] font-serif-classic text-lg text-[color:var(--cream)]">
                      <span className="gold-text font-display tracking-widest uppercase text-xs">Stay Duration</span>
                      <div className="mt-1">{nights} night{nights !== 1 ? "s" : ""} at the maison</div>
                    </div>
                  )}
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="font-italiana text-3xl md:text-4xl text-[color:var(--ivory)] mb-2">Choose Your Residence</h2>
                  <p className="font-serif-classic text-[color:var(--cream)]/70 mb-8 italic">Six extraordinary sanctuaries compose our collection.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ROOMS.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => set("roomId", r.id)}
                        className={`text-left group overflow-hidden border transition-all ${
                          form.roomId === r.id
                            ? "border-[color:var(--gold-bright)] bg-[rgba(184,147,90,0.08)]"
                            : "border-gold-subtle hover:border-[color:var(--gold)]"
                        }`}
                      >
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <img src={r.image} alt={r.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,6,0.85)] to-transparent" />
                          {form.roomId === r.id && (
                            <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[color:var(--gold-bright)] flex items-center justify-center text-[color:var(--ink)] text-sm">✓</div>
                          )}
                          <div className="absolute bottom-3 left-3 right-3">
                            <div className="font-display text-[0.6rem] tracking-[0.3em] gold-text uppercase">{r.category}</div>
                            <div className="font-italiana text-xl text-[color:var(--ivory)]">{r.name}</div>
                          </div>
                        </div>
                        <div className="p-4 flex items-center justify-between text-sm font-serif-classic">
                          <span className="text-[color:var(--champagne)]">{r.size}</span>
                          <span className="gold-text font-display tracking-widest">€{r.price}/n</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="font-italiana text-3xl md:text-4xl text-[color:var(--ivory)] mb-2">Guest Particulars</h2>
                  <p className="font-serif-classic text-[color:var(--cream)]/70 mb-8 italic">So that we may receive you with the attention you deserve.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-display text-[0.65rem] tracking-[0.3em] gold-text uppercase mb-3">First Name</label>
                      <input value={form.firstName} onChange={(e) => set("firstName", e.target.value)} className="royal-input" placeholder="First Name" />
                    </div>
                    <div>
                      <label className="block font-display text-[0.65rem] tracking-[0.3em] gold-text uppercase mb-3">Last Name</label>
                      <input value={form.lastName} onChange={(e) => set("lastName", e.target.value)} className="royal-input" placeholder="Last Name" />
                    </div>
                    <div>
                      <label className="block font-display text-[0.65rem] tracking-[0.3em] gold-text uppercase mb-3">Email</label>
                      <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className="royal-input" placeholder="Email" />
                    </div>
                    <div>
                      <label className="block font-display text-[0.65rem] tracking-[0.3em] gold-text uppercase mb-3">Telephone</label>
                      <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} className="royal-input" placeholder="Telephone" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="block font-display text-[0.65rem] tracking-[0.3em] gold-text uppercase mb-3">Special Requests</label>
                    <textarea rows={4} value={form.requests} onChange={(e) => set("requests", e.target.value)} className="royal-input" placeholder="Anniversaries, dietary needs, preferences..." />
                  </div>

                  <div className="mt-8">
                    <div className="font-display text-[0.65rem] tracking-[0.3em] gold-text uppercase mb-4">Optional Additions</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        "Airport Chauffeur · €180",
                        "Champagne Arrival · €120",
                        "Couples Spa Ritual · €380",
                        "Private Chef Dinner · €650",
                        "Floral Composition · €140",
                        "Anniversary Turndown · €120",
                      ].map((e) => {
                        const key = e.split("·")[0].trim();
                        const active = form.extras.includes(key);
                        return (
                          <button
                            key={e}
                            onClick={() => toggleExtra(key)}
                            className={`text-left p-4 border transition-all flex items-center justify-between ${
                              active ? "border-[color:var(--gold-bright)] bg-[rgba(184,147,90,0.08)]" : "border-gold-subtle hover:border-[color:var(--gold)]"
                            }`}
                          >
                            <span className="font-serif-classic text-[color:var(--ivory)]">{e}</span>
                            <span className={`w-5 h-5 border flex items-center justify-center text-xs ${active ? "border-[color:var(--gold-bright)] gold-text" : "border-gold-subtle"}`}>{active ? "✓" : ""}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h2 className="font-italiana text-3xl md:text-4xl text-[color:var(--ivory)] mb-2">Secure Payment</h2>
                  <p className="font-serif-classic text-[color:var(--cream)]/70 mb-8 italic">
                    Your payment is encrypted end-to-end. A hold will be placed and settled upon departure.
                  </p>
                  <div className="flex items-center gap-3 mb-6 p-4 border border-gold-subtle bg-[rgba(31,59,45,0.15)]">
                    <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z" />
                    </svg>
                    <span className="font-serif-classic text-sm text-[color:var(--cream)]">256-bit TLS · PCI-DSS Compliant · Fraud Protection Active</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block font-display text-[0.65rem] tracking-[0.3em] gold-text uppercase mb-3">Cardholder Name</label>
                      <input value={form.cardName} onChange={(e) => set("cardName", e.target.value)} className="royal-input" placeholder="Name on Card" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block font-display text-[0.65rem] tracking-[0.3em] gold-text uppercase mb-3">Card Number</label>
                      <input
                        value={form.cardNumber}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                          set("cardNumber", v.replace(/(.{4})/g, "$1 ").trim());
                        }}
                        className="royal-input tracking-widest"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div>
                      <label className="block font-display text-[0.65rem] tracking-[0.3em] gold-text uppercase mb-3">Expiry</label>
                      <input
                        value={form.expiry}
                        onChange={(e) => {
                          let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                          if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
                          set("expiry", v);
                        }}
                        className="royal-input"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block font-display text-[0.65rem] tracking-[0.3em] gold-text uppercase mb-3">CVC</label>
                      <input
                        value={form.cvc}
                        onChange={(e) => set("cvc", e.target.value.replace(/\D/g, "").slice(0, 4))}
                        className="royal-input"
                        placeholder="123"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {["Visa", "Mastercard", "Amex", "Apple Pay"].map((m) => (
                      <span key={m} className="text-[0.65rem] font-display tracking-[0.25em] uppercase px-3 py-1.5 border border-gold-subtle text-[color:var(--champagne)]">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Nav */}
              <div className="mt-10 flex items-center justify-between pt-8 border-t border-gold-subtle">
                {step > 1 ? (
                  <button onClick={() => setStep((step - 1) as Step)} className="btn-royal">← Previous</button>
                ) : <div />}
                {step < 4 ? (
                  <button onClick={() => canNext() && setStep((step + 1) as Step)} className={`btn-gold ${!canNext() ? "opacity-40 cursor-not-allowed" : ""}`} disabled={!canNext()}>
                    Continue →
                  </button>
                ) : (
                  <button onClick={() => canNext() && setConfirmed(true)} className={`btn-gold ${!canNext() ? "opacity-40 cursor-not-allowed" : ""}`} disabled={!canNext()}>
                    Confirm Reservation
                  </button>
                )}
              </div>
            </div>

            {/* Summary sidebar */}
            <aside className="lg:col-span-4 bg-royal-panel p-8 h-fit lg:sticky lg:top-28">
              <div className="font-display text-[0.65rem] tracking-[0.35em] gold-text uppercase mb-5">Your Reservation</div>

              {room ? (
                <>
                  <div className="relative aspect-[4/3] overflow-hidden border border-gold-subtle mb-5">
                    <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="font-italiana text-2xl text-[color:var(--ivory)]">{room.name}</div>
                  <div className="font-display text-[0.65rem] tracking-[0.3em] text-[color:var(--champagne)] uppercase mt-1">{room.category}</div>
                </>
              ) : (
                <div className="aspect-[4/3] border border-dashed border-gold-subtle flex items-center justify-center text-center p-6 mb-5">
                  <div className="font-serif-classic italic text-[color:var(--champagne)]">Select a residence to preview</div>
                </div>
              )}

              <dl className="mt-6 space-y-3 font-serif-classic text-base">
                <div className="flex justify-between"><dt className="text-[color:var(--champagne)]">Arrival</dt><dd className="text-[color:var(--ivory)]">{form.checkIn || "—"}</dd></div>
                <div className="flex justify-between"><dt className="text-[color:var(--champagne)]">Departure</dt><dd className="text-[color:var(--ivory)]">{form.checkOut || "—"}</dd></div>
                <div className="flex justify-between"><dt className="text-[color:var(--champagne)]">Nights</dt><dd className="text-[color:var(--ivory)]">{nights}</dd></div>
                <div className="flex justify-between"><dt className="text-[color:var(--champagne)]">Guests</dt><dd className="text-[color:var(--ivory)]">{form.adults}A · {form.children}C</dd></div>
              </dl>

              <div className="mt-6 pt-6 border-t border-gold-subtle space-y-2 font-serif-classic text-base">
                <div className="flex justify-between"><dt className="text-[color:var(--champagne)]">Room ({nights} × €{room?.price || 0})</dt><dd>€{subtotal.toLocaleString()}</dd></div>
                {extrasTotal > 0 && (
                  <div className="flex justify-between"><dt className="text-[color:var(--champagne)]">Additions</dt><dd>€{extrasTotal}</dd></div>
                )}
                <div className="flex justify-between"><dt className="text-[color:var(--champagne)]">Taxes & Service</dt><dd>€{tax}</dd></div>
              </div>
              <div className="mt-4 pt-4 border-t border-gold-subtle flex items-center justify-between">
                <div className="font-display text-xs tracking-[0.3em] gold-text uppercase">Total</div>
                <div className="font-italiana text-3xl gold-text">€{total.toLocaleString()}</div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

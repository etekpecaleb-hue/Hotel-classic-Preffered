import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveals elements matching `.fade-up`, `.fade-in`, `.stagger-children` on scroll.
 */
export function usePageReveal() {
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctxRef.current = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".fade-up").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }
        );
      });
      gsap.utils.toArray<HTMLElement>(".fade-in").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });
      gsap.utils.toArray<HTMLElement>(".stagger-children").forEach((el) => {
        const children = Array.from(el.children);
        gsap.fromTo(
          children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }
        );
      });
    });
    return () => {
      ctxRef.current?.revert();
    };
  }, []);
}

/** Split text into animated chars for a headline */
export function useSplitChars(ref: React.RefObject<HTMLElement | null>, delay = 0) {
  useEffect(() => {
    if (!ref.current) return;
    const chars = ref.current.querySelectorAll(".char");
    gsap.fromTo(
      chars,
      { y: 50, opacity: 0, rotateX: -40 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1,
        stagger: 0.025,
        ease: "power4.out",
        delay,
      }
    );
  }, [ref, delay]);
}

export function splitChars(text: string) {
  return text.split("").map((c, i) => (
    <span
      key={i}
      className="char inline-block"
      style={{ whiteSpace: c === " " ? "pre" : undefined }}
    >
      {c}
    </span>
  ));
}

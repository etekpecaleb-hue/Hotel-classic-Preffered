import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface Slide {
  image: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  cta?: { label: string; href: string };
}

interface Props {
  slides: Slide[];
  heightClass?: string;
  showControls?: boolean;
  autoplay?: boolean;
  effect?: "slide" | "fade";
  className?: string;
}

export default function ImageCarousel({
  slides,
  heightClass = "h-[70vh] min-h-[500px]",
  showControls = true,
  autoplay = true,
  effect = "fade",
  className = "",
}: Props) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
      effect={effect === "fade" ? "fade" : undefined}
      fadeEffect={{ crossFade: true }}
      loop
      navigation={showControls}
      pagination={{ clickable: true }}
      autoplay={autoplay ? { delay: 5500, disableOnInteraction: false } : false}
      speed={1200}
      className={`royal-swiper w-full ${heightClass} ${className}`}
    >
      {slides.map((s, i) => (
        <SwiperSlide key={i} className="relative">
          <div className="absolute inset-0">
            <img
              src={s.image}
              alt={s.title}
              loading={i === 0 ? "eager" : "lazy"}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,6,0.85)] via-[rgba(10,8,6,0.35)] to-[rgba(10,8,6,0.45)]" />
          </div>
          <div className="relative h-full flex items-end pb-20 md:pb-28">
            <div className="max-w-[1600px] w-full mx-auto px-6 md:px-16">
              {s.eyebrow && (
                <div className="font-display text-[0.72rem] tracking-[0.45em] gold-text mb-4 uppercase">
                  — {s.eyebrow}
                </div>
              )}
              <h3 className="font-italiana text-3xl md:text-5xl lg:text-6xl text-[color:var(--ivory)] text-shadow-royal max-w-3xl leading-[1.1]">
                {s.title}
              </h3>
              {s.subtitle && (
                <p className="font-serif-classic text-lg md:text-xl text-[color:var(--cream)]/85 mt-5 max-w-xl italic">
                  {s.subtitle}
                </p>
              )}
              {s.cta && (
                <a href={s.cta.href} className="btn-royal mt-8">
                  {s.cta.label}
                </a>
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

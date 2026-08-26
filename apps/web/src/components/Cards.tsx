"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface CardsProps {
  images: Array<{ src: string; alt: string }>;
}

const defaultProps: CardsProps = {
  images: [
    { src: "/arcon-hero.png", alt: "Placeholder 1" },
    { src: "/arcon-hero.png", alt: "Placeholder 2" },
    { src: "/arcon-hero.png", alt: "Placeholder 3" },
    { src: "/arcon-hero.png", alt: "Placeholder 4" },
    { src: "/arcon-hero.png", alt: "Placeholder 5" },
    { src: "/arcon-hero.png", alt: "Placeholder 6" },
    { src: "/arcon-hero.png", alt: "Placeholder 7" },
    { src: "/arcon-hero.png", alt: "Placeholder 8" },
    { src: "/arcon-hero.png", alt: "Placeholder 9" },
  ],
};

const mobileHeadline = "Install, connect, and ship production ready interfaces faster.";

const Cards = (props: Partial<CardsProps>) => {
  const { images } = { ...defaultProps, ...props };
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>('.card-item');
      
        cards.forEach((card) => {
          gsap.fromTo(card, 
            { 
              y: 150,
              opacity: 0
            },
            {
              y: 0,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "top 75%",
                scrub: 1,
              }
            }
          );
        });
      }, containerRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  // The specific layout classes that create the exact masonry look
  const cardLayouts = [
    "col-span-1 row-span-2 md:row-start-2", // Card 1 - Left Col, Top
    "col-span-1 row-span-4 md:col-start-1 md:row-start-4", // Card 2 - Left Col, Bottom (Tall)
    "col-span-1 row-span-2 md:col-start-2 md:row-start-1", // Card 3 - Mid-Left Col, Top
    "col-span-1 row-span-3 md:col-start-2 md:row-start-3", // Card 4 - Mid-Left Col, Middle
    "col-span-1 row-span-2 md:col-start-2 md:row-start-6", // Card 5 - Mid-Left Col, Bottom
    "col-span-1 md:col-span-2 row-span-3 md:col-start-3 md:row-start-1", // Card 6 - Right Cols, Top (Large)
    "col-span-1 row-span-2 md:col-start-3 md:row-start-4", // Card 7 - Mid-Right Col, Middle
    "col-span-1 row-span-3 md:col-start-4 md:row-start-4", // Card 8 - Right Col, Middle (Tall)
    "col-span-1 row-span-2 md:col-start-3 md:row-start-6", // Card 9 - Mid-Right Col, Bottom
  ];

  return (
    <section ref={containerRef} className="w-full max-w-7xl mx-auto px-4 py-24 bg-background">
      <h2 className="md:hidden text-2xl leading-tight font-semibold tracking-tight text-black mb-6 max-w-sm">
        {mobileHeadline}
      </h2>

      <div className="max-h-[500px] md:max-h-none overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[100px] w-full relative">
          {cardLayouts.map((layoutClass, index) => {
            const image = images[index] || defaultProps.images![index] || { src: "/arcon-hero.png", alt: "Placeholder" };
            
            return (
              <div
                key={index}
                className={`card-item ${layoutClass} bg-white rounded-xl md:rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden relative group`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover bg-gray-50/50 group-hover:bg-gray-100/50 transition-colors"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { Cards };

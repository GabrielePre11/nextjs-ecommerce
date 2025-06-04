"use client";

//=============== CONTAINER, NEXT ELEMENTS, SWIPERJS ===============//
// Layout
import Container from "@/layout/Container";

// Next Elements
import Image from "next/image";
import React from "react";

// Swiper Elements
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

// Swiper Imports
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Data
import { sliderBanner } from "@/lib/data";

const Hero = () => {
  return (
    <section className="pt-24">
      <Container className="relative">
        {/*=============== SWIPERJS SLIDER===============*/}
        <Swiper
          className="rounded-lg shadow-lg shadow-neutral-500"
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          effect="fade"
          loop
        >
          {sliderBanner.map((slide) => (
            <SwiperSlide key={slide.name}>
              <figure className="relative aspect-[16/5] rounded-lg">
                <Image
                  src={slide.src}
                  alt={slide.name}
                  fill
                  className="object-cover rounded-lg"
                  priority={true}
                  quality={90}
                />
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default Hero;

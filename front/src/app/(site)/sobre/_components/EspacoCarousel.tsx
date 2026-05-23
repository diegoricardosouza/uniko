'use client';

import Image from "next/image";
import { useState } from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SliderNavigation } from "../../imoveis/_components/SliderNavigation";

export function EspacoCarousel() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  });

  return (
    <Swiper
      className={`mySwiperProperty mySwiperEspaco`}
      onSlideChange={swiper => {
        setSliderState({
          isBeginning: swiper.isBeginning,
          isEnd: swiper.isEnd,
        })
      }}
    >
      <SwiperSlide className="mySwiperPropertySlide">
        <Image
          src="/sobre/img1.png"
          width={570}
          height={427}
          alt="Espaço Úniko"
          className="h-[300px] md:h-[427px] w-full object-cover object-center rounded-tr-[20px] rounded-b-[20px]"
          unoptimized
        />
      </SwiperSlide>
      <SwiperSlide className="mySwiperPropertySlide">
        <Image
          src="/sobre/img2.png"
          width={570}
          height={427}
          alt="Espaço Úniko"
          className="h-[300px] md:h-[427px] w-full object-cover object-center rounded-tr-[20px] rounded-b-[20px]"
          unoptimized
        />
      </SwiperSlide>
      <SwiperSlide className="mySwiperPropertySlide">
        <Image
          src="/sobre/img3.png"
          width={570}
          height={427}
          alt="Espaço Úniko"
          className="h-[300px] md:h-[427px] w-full object-cover object-center rounded-tr-[20px] rounded-b-[20px]"
          unoptimized
        />
      </SwiperSlide>
      <SwiperSlide className="mySwiperPropertySlide">
        <Image
          src="/sobre/img4.png"
          width={570}
          height={427}
          alt="Espaço Úniko"
          className="h-[300px] md:h-[427px] w-full object-cover object-center rounded-tr-[20px] rounded-b-[20px]"
          unoptimized
        />
      </SwiperSlide>
      <SwiperSlide className="mySwiperPropertySlide">
        <Image
          src="/sobre/img5.png"
          width={570}
          height={427}
          alt="Espaço Úniko"
          className="h-[300px] md:h-[427px] w-full object-cover object-center rounded-tr-[20px] rounded-b-[20px]"
          unoptimized
        />
      </SwiperSlide>
      <SwiperSlide className="mySwiperPropertySlide">
        <Image
          src="/sobre/img6.png"
          width={570}
          height={427}
          alt="Espaço Úniko"
          className="h-[300px] md:h-[427px] w-full object-cover object-center rounded-tr-[20px] rounded-b-[20px]"
          unoptimized
        />
      </SwiperSlide>
      <SwiperSlide className="mySwiperPropertySlide">
        <Image
          src="/sobre/img7.png"
          width={570}
          height={427}
          alt="Espaço Úniko"
          className="h-[300px] md:h-[427px] w-full object-cover object-center rounded-tr-[20px] rounded-b-[20px]"
          unoptimized
        />
      </SwiperSlide>

      <SliderNavigation
        isBeginning={sliderState.isBeginning}
        isEnd={sliderState.isEnd}
      />
    </Swiper>
  )
}
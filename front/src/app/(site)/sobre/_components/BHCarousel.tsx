'use client';

import Image from "next/image";
import { useState } from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';

export function BHCarousel() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  });

  return (
    <Swiper
      className={`mySwiperProperty mySwiperCuritiba`}
      onSlideChange={swiper => {
        setSliderState({
          isBeginning: swiper.isBeginning,
          isEnd: swiper.isEnd,
        })
      }}
    >
      <SwiperSlide className="mySwiperPropertySlide">
        <Image
          src="/sobre/bh.png"
          width={570}
          height={427}
          alt="Espaço Úniko"
          className="h-[300px] md:h-[427px] w-full object-cover object-center rounded-tr-[20px] rounded-b-[20px]"
          unoptimized
        />
      </SwiperSlide>

      {/* <SliderNavigation
        isBeginning={sliderState.isBeginning}
        isEnd={sliderState.isEnd}
      /> */}
    </Swiper>
  )
}
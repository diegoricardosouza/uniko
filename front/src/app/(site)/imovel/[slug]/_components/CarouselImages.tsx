'use client'

import { Gallery } from "@/components/icons/Gallery";
import { PropertyVistaList } from "@/entities/PropertyVista";
import Image from "next/image";
import { useState } from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { SliderNavigation } from "./SliderNavigation";

interface CarouselImagesProps {
  property: PropertyVistaList
}

export function CarouselImages({ property }: CarouselImagesProps) {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const featuredImageUrl = property.FotoDestaque;
  const imagesUrl = property.Foto

  return (
    <>
      <Swiper
        className={`mySwiperPropertySingle relative cursor-pointer`}
        onSlideChange={swiper => {
          setActiveIndex(swiper.activeIndex)
          setSliderState({
            isBeginning: swiper.isBeginning,
            isEnd: swiper.isEnd,
          })
        }}
      >
        <SwiperSlide className="mySwiperPropertySingleSlide">
          <div
            className="relative"
            onClick={() => {
              setLightboxIndex(0);
              setLightboxOpen(true);
            }}
          >
            <Image
              src={featuredImageUrl}
              width={1920}
              height={500}
              alt={property.TituloSite}
              className="h-[300px] md:h-[500px] w-full object-cover object-center"
              data-lightboxjs={`lightbox-${property.Codigo}`}
            />
            <div
              className="w-full h-[80px] bg-gradient-to-t from-[#000000] to-[#54545400] absolute bottom-0 left-0 z-10"
            />
          </div>
        </SwiperSlide>
        {imagesUrl?.map((media, index) => (
          <SwiperSlide key={index} className="mySwiperPropertySingleSlide">
            <div
              className="relative"
              onClick={() => {
                setLightboxIndex(index + 1);
                setLightboxOpen(true);
              }}
            >
              <Image
                src={media.Foto}
                width={1920}
                height={500}
                alt={property.TituloSite}
                className="h-[300px] md:h-[500px] w-full object-cover object-center"
              />
              <div
                className="w-full h-[80px] bg-gradient-to-t from-[#000000] to-[#54545400] absolute bottom-0 left-0 z-10"
              />
            </div>
          </SwiperSlide>
        ))}

        <div className="absolute top-1/2 -translate-y-1/2 z-50 w-full">
          <div className="container relative">
            <SliderNavigation
              isBeginning={sliderState.isBeginning}
              isEnd={sliderState.isEnd}
            />
          </div>
        </div>

        <div 
          className="absolute left-0 bottom-[15px] z-50 w-full"
          onClick={() => {
            setLightboxIndex(activeIndex);
            setLightboxOpen(true);
          }}
        >
          <div className="container flex gap-[10px]">
            <span
              className="bg-white rounded-[5px_5px_5px_0px] p-2 md:p-[10px] text-[12px] md:text-sm font-inter leading-[17px] text-gold uppercase"
            >
              {property.Categoria}
            </span>
            <span 
              className="bg-gold rounded-[5px_5px_5px_0px] p-2 md:p-[10px] text-[12px] md:text-sm font-inter leading-[17px] text-white uppercase flex gap-[5px]"
            >
              <Gallery />
              {property.Foto?.length} FOTOS
            </span>
          </div>
        </div>
      </Swiper>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={property.Foto?.map(media => ({
          src: media.Foto
        }))}
      />
    </>
  )
}
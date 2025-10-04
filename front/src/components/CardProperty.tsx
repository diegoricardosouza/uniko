'use client'

import { SliderNavigation } from "@/app/(site)/imoveis/_components/SliderNavigation";
import { Property } from "@/entities/Property";
import { Camera } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';

interface CardPropertyProps {
  property: Property
  type?: string;
}

export function CardProperty({ property, type }: CardPropertyProps) {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  });
  const hasAluguel = property.finalities?.some(
    finality => finality.name?.toLowerCase() === 'alugar' ||
      finality.slug?.toLowerCase() === 'alugar'
  );
  const finalityText = hasAluguel ? 'Aluguel' : 'Venda';
  const featuredImageUrl = property.medias?.filter((media) => media.mediaType === 'featured_image')[0]?.url;
  const imagesUrl = property.medias?.filter((media) => media.mediaType !== 'featured_image');  
  
  return (
    <article className="md:flex border-2 border-gold rounded-[0px_20px_20px_20px] bg-bggray overflow-hidden">
      <div className="w-full max-w-[376px] h-full rounded-[0px_20px_20px_20px] overflow-hidden relative">
        <Swiper 
          className={`mySwiperProperty mySwiper${property.id}`}
          onSlideChange={swiper => {
            setSliderState({
              isBeginning: swiper.isBeginning,
              isEnd: swiper.isEnd,
            })
          }}
        >
          <SwiperSlide className="mySwiperPropertySlide">
            <div className="mySwiperPropertyOverlay">
              <Camera className="w-9 h-9 text-white" />
              <span className="text-white font-inter text-[14px] font-normal">+ {(imagesUrl!.length + 1)} FOTOS</span>
            </div>

            <Image 
              src={`${process.env.NEXT_PUBLIC_API_URL}${featuredImageUrl!}`}
              width={1128}
              height={846}
              alt={property.title}
              className="h-[282px] w-full object-cover object-center"
            />
          </SwiperSlide>
          {imagesUrl?.map((media) => (
            <SwiperSlide key={media.id} className="mySwiperPropertySlide">
              <div className="mySwiperPropertyOverlay">
                <Camera className="w-9 h-9 text-white" />
                <span className="text-white font-inter text-[14px] font-normal">+ {(imagesUrl!.length + 1)} FOTOS</span>
              </div>
              
              <Image 
                src={`${process.env.NEXT_PUBLIC_API_URL}${media.url!}`}
                width={752}
                height={564}
                alt={property.title}
                className="h-[282px] w-full object-cover object-center"
              />
            </SwiperSlide>
          ))}
          <SliderNavigation
            isBeginning={sliderState.isBeginning}
            isEnd={sliderState.isEnd}
          />
        </Swiper>
      </div>

      <div className="flex-1 px-5 md:px-[35px] py-5">
        <div className="property-types">
          <span>{property.types?.[0].name}</span>
          {type === 'lancamentos' && <span className="delivery">{property.delivery}</span>}
        </div>

        <header>
          <h2 className="text-gold text-[30px] md:text-[38px] font-montserrat tracking-[-0.95px] font-normal leading-[35px] md:leading-[42px] mb-[3px]">
            {property.title}
          </h2>
        </header>

        <p className="font-inter text-[15px] md:text-[17px] text-content leading-6 font-light">
          {property.neighborhood?.name}, {property.city?.name}/{property.city?.state.acronym}<br />
          {property.privateArea} m² de Área Privativa | {property.bedrooms} {Number(property.bedrooms) > 1 ? 'Dormitórios' : 'Dormitório' }
        </p>

        <hr className="w-full border-0 m-0 h-[2px] bg-gold mt-[19px] mb-[15px]" />

        <div className="flex flex-col gap-3 md:flex-row md:gap-0 justify-between items-center">
          <div className="font-montserrat text-[20px] md:text-[22px] text-title tracking-[-1.1px]">
            <strong>
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(property.price))}
            </strong>
            <span> - {finalityText}</span>
          </div>

          <Link href={`/imovel/${property.slug}`} className="button-geral !text-white shadow-[0px_3px_6px_#00000029] !bg-black hover:!bg-gold">
            DETALHES
            <LuArrowRight className="w-[15px] h-[15px] lg:w-[18px] lg:h-[18px] ml-[-3px]" />
          </Link>
        </div>
      </div>
    </article>
  )
}
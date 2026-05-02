/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { SliderNavigation } from "@/app/(site)/imoveis/_components/SliderNavigation";
import { PropertyVistaFoto, PropertyVistaList } from "@/entities/PropertyVista";
import { Camera } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Spinner } from "./Spinner";

interface CardPropertyProps {
  property: PropertyVistaList
  type?: string;
}

export function CardPropertyVista({ property }: CardPropertyProps) {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  });
  const [fotos, setFotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchFotos = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/imoveis/fotos?code=${property.Codigo}`);
        const data = await response.json();

        if (data.Foto) {
          setFotos(Object.values(data.Foto));
        }

      } catch (error) {
        console.error('Erro ao buscar fotos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFotos();
  }, [property.Codigo]);

  const finalityText = property.Status.toLowerCase() === 'aluguel' ? 'Aluguel' : 'Venda';
  const featuredImageUrl = property.FotoDestaque;
  const bedrooms = Number(property.Dormitorios) > 0 && (Number(property.Dormitorios) > 1 ? ` | ${property.Dormitorios} Dormitórios` : ` | ${property.Dormitorios} Dormitório`);
  const city = !property.Cidade && property.UF === 'PR' ? 'Curitiba' : (!property.Cidade && property.UF === 'MG' ? 'Belo Horizonte' : property.Cidade);
  
  return (
    <article className="md:flex border-2 border-gold rounded-[0px_20px_20px_20px] bg-bggray overflow-hidden">
      <div className="w-full lg:max-w-[376px] h-full rounded-[0px_20px_20px_20px] overflow-hidden relative">
        {loading && (
          <div className="absolute w-full h-full z-50 flex items-center justify-center bg-gold/95">
            <Spinner className="fill-black text-white" />
          </div>
        )}

        <Swiper 
          className={`mySwiperProperty mySwiper${property.Codigo}`}
          onSlideChange={swiper => {
            setSliderState({
              isBeginning: swiper.isBeginning,
              isEnd: swiper.isEnd,
            })
          }}
        >
          {fotos.length > 0 ? fotos?.map((media: PropertyVistaFoto, index) => (
            <SwiperSlide key={index} className="mySwiperPropertySlide">
              <div className="mySwiperPropertyOverlay">
                <Camera className="w-9 h-9 text-white" />
                <span className="text-white font-inter text-[14px] font-normal">+ {fotos.length} FOTOS</span>
              </div>
              
              <Image 
                src={media.Foto}
                width={752}
                height={564}
                alt={property.TituloSite}
                unoptimized
                className="h-[282px] w-full object-cover object-center"
              />
            </SwiperSlide>
          )) : (
            <SwiperSlide className="mySwiperPropertySlide">
              <div className="mySwiperPropertyOverlay">
                <Camera className="w-9 h-9 text-white" />
                <span className="text-white font-inter text-[14px] font-normal">+ {fotos.length} FOTOS</span>
              </div>

              <Image
                src={featuredImageUrl || '/noimage.jpg'}
                width={1128}
                height={846}
                alt={property.TituloSite}
                className="h-[282px] w-full object-cover object-center"
                unoptimized
              />
            </SwiperSlide>
          )}
          
          {fotos.length > 0 && (
            <SliderNavigation
              isBeginning={sliderState.isBeginning}
              isEnd={sliderState.isEnd}
            />
          )}
        </Swiper>
      </div>

      <div className="flex-1 px-5 md:px-[35px] py-5">
        <div className="property-types">
          <span>{property.Categoria}</span>
          {/* {type === 'lancamentos' && <span className="delivery">{property.delivery}</span>} */}
        </div>

        <header>
          <h2 className="text-gold text-[30px] md:text-[36px] font-montserrat font-light leading-[35px] md:leading-[40px] mb-[5px]">
            {property.TituloSite}
          </h2>
        </header>

        <p className="font-inter text-[15px] md:text-[17px] text-content leading-6 font-light">
          <strong className="font-semibold">{property.Bairro}</strong>, {city}/{property.UF}<br />
          <strong className="font-semibold">{property.AreaPrivativa} m²</strong> de Área Privativa 
          {bedrooms}
        </p>

        <hr className="w-full border-0 m-0 h-[2px] bg-gold mt-[19px] mb-[15px]" />

        <div className="flex flex-col gap-3 md:flex-row md:gap-0 justify-between items-center">
          <div>
            {Number(property.ValorVenda) > 0 && (
              <div className="font-montserrat text-[20px] md:text-[22px] text-title">
                <strong>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(property.ValorVenda || 0))}
                </strong>
                <span> - {finalityText}</span>
              </div>
            )}
            {Number(property.ValorLocacao) > 0 && (
              <div className="font-montserrat text-[20px] md:text-[22px] text-title">
                <strong>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(property.ValorLocacao || 0))}
                </strong>
                <span> - Aluguel</span>
              </div>
            )}
          </div>

          <Link href={`/imovel/${property.Codigo}`} target="_blank" className="button-geral !text-white shadow-[0px_3px_6px_#00000029] !bg-black hover:!bg-gold">
            DETALHES
            <LuArrowRight className="w-[15px] h-[15px] lg:w-[18px] lg:h-[18px] ml-[-3px]" />
          </Link>
        </div>
      </div>
    </article>
  )
}
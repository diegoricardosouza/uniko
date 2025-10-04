'use client'

import { Bathroom } from "@/components/icons/Bathroom"
import { Bedroom } from "@/components/icons/Bedroom"
import { Facebook } from "@/components/icons/Facebook"
import { Mail } from "@/components/icons/Mail"
import { ParkingSpace } from "@/components/icons/ParkingSpace"
import { PrivateArea } from "@/components/icons/PrivateArea"
import { TotalArea } from "@/components/icons/TotalArea"
import { Property } from "@/entities/Property"
import { useEffect, useState } from "react"
import { FaWhatsapp } from "react-icons/fa"
import { LuArrowRight } from "react-icons/lu"

interface ContentPropertyProps {
  property: Property
}

export function ContentProperty({ property }: ContentPropertyProps) {
  const [currentUrl, setCurrentUrl] = useState('')

  const releases = property.finalities?.some((item) => item.name === 'Lançamentos')
  const hasAluguel = property.finalities?.some(
    finality => finality.name?.toLowerCase() === 'alugar' ||
      finality.slug?.toLowerCase() === 'alugar'
  );
  const finalityText = hasAluguel ? 'Aluguel' : 'Venda';
  const whats = property.city?.name === "Curitiba" ? 'https://wa.me/5541996615511' : 'https://wa.me/5531999868706'

  // Pega a URL completa apenas no cliente
  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  // URLs de compartilhamento
  const shareTitle = encodeURIComponent(property.title || '')
  const shareDescription = encodeURIComponent(
    `${property.title} - ${finalityText} por ${new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Number(property.price))}`
  )

  const shareUrls = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(currentUrl)}%20-%20${shareDescription}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    email: `mailto:?subject=${shareTitle}&body=${shareDescription}%20-%20${encodeURIComponent(currentUrl)}`
  }

  return (
    <div className="container flex flex-col md:flex-row gap-[30px] !mt-5 !mb-[50px]">
      <div className="flex-1 w-full">
        <header>
          <h1
            className="text-gold text-[30px] md:text-[38px] font-montserrat tracking-[-0.95px] font-normal leading-[35px] md:leading-[47px] mb-[20px]"
          >
            {property.title}
          </h1>
        </header>

        <div className="mb-9">
          <h3 className="font-montserrat text-[25px] text-gold leading-[30px]">
            Ficha <strong className="font-semibold">Técnica</strong>
          </h3>

          <div className="border border-gold mt-[10px] py-[15px] md:py-5 px-5 md:px-[30px] flex flex-wrap gap-x-[50px] gap-y-5">
            <div className="flex gap-[10px] items-center">
              <PrivateArea />
              <span className="font-inter text-[17px] leading-5 text-content">
                <strong className="font-semibold">{property.privateArea} m²</strong> de Área Privativa
              </span>
            </div>

            <div className="flex gap-[10px] items-center">
              <Bedroom />
              <span className="font-inter text-[17px] leading-5 text-content">
                <strong className="font-semibold">{property.bedrooms}</strong> Dormitórios
              </span>
            </div>

            <div className="flex gap-[10px] items-center">
              <ParkingSpace />
              <span className="font-inter text-[17px] leading-5 text-content">
                <strong className="font-semibold">{property.parkingSpaces}</strong> Vagas
              </span>
            </div>

            <div className="flex gap-[10px] items-center min-w-[238px]">
              <TotalArea />
              <span className="font-inter text-[17px] leading-5 text-content">
                <strong className="font-semibold">{property.totalArea} m²</strong> de Área Total
              </span>
            </div>

            <div className="flex gap-[10px] items-center">
              <Bathroom />
              <span className="font-inter text-[17px] leading-5 text-content">
                <strong className="font-semibold">{property.bathrooms}</strong> Banheiros
              </span>
            </div>
          </div>
        </div>

        <div className="content content-property"
          dangerouslySetInnerHTML={{ __html: property.description ?? '' }}
        />

        <hr className="border-0 w-full m-0 h-[1px] bg-gold mt-[5px] mb-[30px]" />

        <div>
          <h3 className="font-montserrat text-[25px] text-gold leading-[30px] mb-[10px]">
            Outras <strong className="font-semibold">Características</strong>
          </h3>

          <div className="flex flex-wrap gap-[15px]">
            {property.characteristics?.map((charac) => (
              <span
                className="bg-bggray px-3 md:px-[15px] py-[11px] md:py-[14px] text-sm md:text-[15px] font-inter text-black"
                key={charac.id}
              >
                {charac.name}
              </span>
            ))}
          </div>
        </div>

        <hr className="border-0 w-full m-0 h-[1px] bg-gold mt-[30px] mb-[30px]" />

        <div>
          <h3 className="font-montserrat text-[25px] text-gold leading-[30px] mb-[10px]">
            Infraestrutura do <strong className="font-semibold">Condomínio</strong>
          </h3>

          <div className="flex flex-wrap gap-[15px]">
            {property.infrastructures?.map((charac) => (
              <span
                className="bg-bggray px-3 md:px-[15px] py-[11px] md:py-[14px] text-sm md:text-[15px] font-inter text-black"
                key={charac.id}
              >
                {charac.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <aside className="w-full max-w-[380px] md:mt-[-60px] relative z-10">
        <div className="bg-bggray sticky top-[140px] rounded-[0px_20px_20px_20px] px-[25px] pt-5 pb-[15px]">
          <div className="flex gap-9 items-center mb-5">
            <span
              className="bg-title px-[15px] py-[10px] shadow-[0px_3px_6px_#00000029] text-gold font-inter font-normal text-sm leading-[17px]"
            >
              {property.reference}
            </span>

            {releases && (
              <p className="font-inter text-gold text-sm leading-5">
                {property.delivery}
              </p>
            )}
          </div>

          <address className="font-inter text-[17px] leading-6 text-title">
            <strong className="font-semibold">{property.address}</strong><br />
            <strong className="font-semibold">{property.neighborhood?.name}</strong>, {property.city?.name}/{property.city?.state.acronym}
          </address>

          <hr className="border-0 w-full m-0 h-[1px] bg-gold mt-[15px] mb-[15px]" />

          <div>
            <div className="font-montserrat text-[20px] md:text-[22px] text-title tracking-[-1.1px] mb-[5px] leading-7">
              <strong>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(property.price))}
              </strong>
              <span> - {finalityText}</span>
            </div>

            {property.priceCondominium && (
              <div className="font-montserrat text-[18px] md:text-[20px] text-title tracking-[-1px] mb-[5px] leading-6">
                <strong>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(property.priceCondominium))}
                </strong>
                <span> - Condomínio*</span>
              </div>
            )}

            {property.priceIptu && (
              <div className="font-montserrat text-[18px] md:text-[20px] text-title tracking-[-1px] leading-6">
                <strong>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(property.priceIptu))}
                </strong>
                <span> - IPTU**</span>
              </div>
            )}

            <div className="flex justify-center mt-5">
              <a
                href={whats}
                target="_blank"
                rel="noopener noreferrer"
                className="button-geral !text-white shadow-[0px_3px_6px_#00000029] !bg-black hover:!bg-gold"
              >
                FALE COM UM ESPECIALISTA
                <LuArrowRight className="w-[15px] h-[15px] lg:w-[18px] lg:h-[18px] ml-[-3px]" />
              </a>
            </div>
          </div>

          <hr className="border-0 w-full m-0 h-[1px] bg-gold mt-[27px] mb-[15px]" />

          <div className="flex gap-1.5 items-center">
            <span className="text-gold text-sm font-inter leading-[17px]">COMPARTILHAR:</span>

            <ul className="flex gap-5 items-center">
              <li>
                <a
                  href={shareUrls.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Compartilhar no WhatsApp"
                >
                  <FaWhatsapp className="w-[28px] h-[28px] text-content hover:text-gold transition-all" />
                </a>
              </li>
              <li>
                <a
                  href={shareUrls.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Compartilhar no Facebook"
                >
                  <Facebook classname="text-content hover:text-gold transition-all" />
                </a>
              </li>
              <li>
                <a
                  href={shareUrls.email}
                  aria-label="Compartilhar por Email"
                >
                  <Mail classname="text-content hover:text-gold transition-all" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  )
}
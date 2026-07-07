/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Bathroom } from "@/components/icons/Bathroom"
import { Bedroom } from "@/components/icons/Bedroom"
import { Facebook } from "@/components/icons/Facebook"
import { Mail } from "@/components/icons/Mail"
import { ParkingSpace } from "@/components/icons/ParkingSpace"
import { PrivateArea } from "@/components/icons/PrivateArea"
import { TotalArea } from "@/components/icons/TotalArea"
import { PropertyVistaList } from "@/entities/PropertyVista"
import { mapperWords } from "@/lib/mapperWords"
import { useEffect, useState } from "react"
import { FaWhatsapp } from "react-icons/fa"
import { LuArrowRight } from "react-icons/lu"

interface ContentPropertyProps {
  property: PropertyVistaList
}

export function ContentProperty({ property }: ContentPropertyProps) {
  const [currentUrl, setCurrentUrl] = useState('')

  const finalityText = property.Status;
  const whats = property.Cidade === "Curitiba" ? 'https://wa.me/5541996615511' : 'https://wa.me/5531999868706'

  const cityTrated = property.Cidade ? property.Cidade : (property.UF === 'PR' ? 'Curitiba' : '')

  // Pega a URL completa apenas no cliente
  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  // URLs de compartilhamento
  const shareTitle = encodeURIComponent(property.TituloSite || '')
  const shareDescription = encodeURIComponent(
    `${property.TituloSite} - ${finalityText} por ${new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Number(property.ValorVenda || property.ValorLocacao))}`
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
            className="text-gold text-[30px] md:text-[36px] font-montserrat font-light leading-[35px] md:leading-[42px] mb-[5px]"
          >
            {property.TituloSite || property.Empreendimento}
          </h1>
        </header>

        {property.Categoria !== 'Empreendimento' && (
          <div className="mb-9">
            <h3 className="font-montserrat text-[25px] font-light text-gold leading-[30px]">
              Ficha <strong className="font-medium">Técnica</strong>
            </h3>

            <div className="border border-gold mt-[10px] py-[15px] md:py-5 px-5 md:px-[30px] flex flex-wrap gap-x-[50px] gap-y-5">
              <div className="flex gap-[10px] items-center min-w-[252px]">
                <PrivateArea />
                <span className="font-inter text-[17px] leading-5 text-content">
                  <strong className="font-semibold">{property.AreaPrivativa} m²</strong> de Área Privativa
                </span>
              </div>

              <div className="flex gap-[10px] items-center min-w-[148px]">
                <Bedroom />
                <span className="font-inter text-[17px] leading-5 text-content">
                  <strong className="font-semibold">{property.Dormitorios} </strong> 
                  {property.Dormitorios === "1" ? 'Dormitório' : 'Dormitórios'}
                </span>
              </div>

              <div className="flex gap-[10px] items-center">
                <ParkingSpace />
                <span className="font-inter text-[17px] leading-5 text-content">
                  <strong className="font-semibold">{property.Vagas} </strong> 
                  {property.Vagas === "1" ? 'Vaga' : 'Vagas'}
                </span>
              </div>

              <div className="flex gap-[10px] items-center min-w-[252px]">
                <TotalArea />
                <span className="font-inter text-[17px] leading-5 text-content">
                  <strong className="font-semibold">{property.AreaTotal} m²</strong> de Área Total
                </span>
              </div>

              {Number(property.BanheiroSocialQtd) > 0 && (
                <div className="flex gap-[10px] items-center min-w-[148px]">
                  <Bathroom />
                  <span className="font-inter text-[17px] leading-5 text-content">
                    <strong className="font-semibold">{property.BanheiroSocialQtd} </strong> 
                    {property.BanheiroSocialQtd === "1" ? 'Banheiro' : 'Banheiros'}
                  </span>
                </div>
              )}

              {Number(property.Suites) > 0 && (
                <div className="flex gap-[10px] items-center">
                  <Bathroom />
                  <span className="font-inter text-[17px] leading-5 text-content">
                    <strong className="font-semibold">{property.Suites} </strong> 
                    {property.Suites === "1" ? 'Suite' : 'Suites'}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="content content-property">
          <p dangerouslySetInnerHTML={{ __html: property.DescricaoWeb || "" }} />

          <p dangerouslySetInnerHTML={{ __html: property.DescricaoEmpreendimento || "" }} />
        </div>

        <hr className="border-0 w-full m-0 h-[1px] bg-gold mt-[5px] mb-[30px]" />

        {(() => {
          const caracteristicas = Object.entries(property.Caracteristicas).filter(
            ([_, value]) => value && value !== "Nao" && value !== "0"
          );

          if (caracteristicas.length === 0) return null;

          return (
            <>
              <div>
                <h3 className="font-montserrat text-[25px] text-gold leading-[30px] mb-[10px]">
                  Outras <strong className="font-medium">Características</strong>
                </h3>
                <div className="flex flex-wrap gap-[15px]">
                  {caracteristicas.map(([key, value]) => (
                    <span
                      className="bg-bggray px-3 md:px-[15px] py-[11px] md:py-[13px] text-sm md:text-[16px] font-inter text-title font-normal"
                      key={key}
                    >
                      {mapperWords(key)}{value !== "Sim" ? `: ${value}` : ""}
                    </span>
                  ))}
                </div>
              </div>

              <hr className="border-0 w-full m-0 h-[1px] bg-gold mt-[30px] mb-[30px]" />
            </>
          );
        })()}

        {property.InfraEstrutura && Object.entries(property.InfraEstrutura).some(
          ([_, value]) => value && value !== "Nao" && value !== "0"
        ) && (
            <div>
              <h3 className="font-montserrat text-[25px] text-gold leading-[30px] mb-[10px]">
                Infraestrutura do <strong className="font-medium">Condomínio</strong>
              </h3>
              <div className="flex flex-wrap gap-[15px]">
                {Object.entries(property.InfraEstrutura)
                  .filter(([_, value]) => value && value !== "Nao" && value !== "0")
                  .map(([key]) => (
                    <span
                      className="bg-bggray px-3 md:px-[15px] py-[11px] md:py-[13px] text-sm md:text-[16px] font-inter text-title font-normal"
                      key={key}
                    >
                      {mapperWords(key)}
                    </span>
                  ))}
              </div>
            </div>
          )}
      </div>

      <aside className="w-full max-w-[380px] md:mt-[-60px] relative z-10">
        <div className="bg-bggray sticky top-[140px] rounded-[0px_20px_20px_20px] px-[25px] pt-5 pb-[15px]">
          <div className="flex gap-9 items-center mb-5">
            <span
              className="bg-title px-[15px] py-[10px] shadow-[0px_3px_6px_#00000029] text-gold font-inter font-medium text-sm leading-[17px]"
            >
              {property.Codigo}
            </span>

            {/* {releases && (
              <p className="font-inter text-gold text-sm leading-5">
                {property.delivery}
              </p>
            )} */}
          </div>

          <address className="font-inter text-[17px] leading-6 text-title">
            <strong className="font-semibold">{property.Endereco}, {property.Numero}</strong><br />
            <strong className="font-semibold">{property.Bairro}</strong>, {cityTrated}/{property.UF}
          </address>

          <hr className="border-0 w-full m-0 h-[1px] bg-gold mt-[15px] mb-[15px]" />

          <div>
            {Number(property.ValorVenda) !== 0 && (
              <div className="font-montserrat text-[20px] md:text-[22px] text-title mb-[5px] leading-7">
                <strong>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(property.ValorVenda || property.ValorLocacao))}
                </strong>
                <span> - {finalityText}</span>
              </div>
            )}
            
            {Number(property.ValorLocacao) > 0 && (
              <div className="font-montserrat text-[20px] md:text-[22px] text-title mb-[5px] leading-7">
                <strong>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(property.ValorLocacao || 0))}
                </strong>
                <span> - Aluguel</span>
              </div>
            )}

            {(Number(property.ValorCondominio) > 0) && (
              <div className="font-montserrat text-[16px] md:text-[18px] text-title mb-[5px] leading-6">
                <strong>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(property.ValorCondominio))}
                </strong>
                <span> - Condomínio*</span>
              </div>
            )}

            {(Number(property.ValorIptu) > 0) && (
              <div className="font-montserrat text-[16px] md:text-[18px] text-title mb-[5px] leading-6">
                <strong>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(property.ValorIptu))}
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

          <div className="flex gap-3 items-center">
            <span className="text-gold text-sm font-inter leading-[17px] font-medium">COMPARTILHAR:</span>

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
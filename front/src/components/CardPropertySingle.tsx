import { PropertyVistaList } from "@/entities/PropertyVista";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface CardPropertySingleProps {
  property: PropertyVistaList
  type?: 'simple' | 'columns'
}

export function CardPropertySingle({ property, type = 'simple' }: CardPropertySingleProps) {
  const featuredImageUrl = property.FotoDestaque;
  const category = property.Categoria;
  const city = !property.Cidade && property.UF === 'PR' ? 'Curitiba' : (!property.Cidade && property.UF === 'MG' ? 'Belo Horizonte' : property.Cidade);

  return (
    <article>
      <Link 
        href={`/imovel/${property.Codigo}`}
        className={cn(
          'block transition-all',
          type === 'columns' && 'p-[10px] hover:bg-white'
        )}
      >
        <div className="rounded-[0_20px_20px_20px] overflow-hidden relative mb-[10px]">
          <div 
            className="w-full h-[80px] bg-gradient-to-b from-[#000000] to-[#54545400] absolute top-0 left-0"
          />
          {/* <p className="font-inter font-normal text-[14px] text-white leading-5 absolute top-[15px] left-[15px] uppercase w-full max-w-[140px]">
            {property.delivery}
          </p> */}
          <Image
            src={featuredImageUrl}
            width={1128}
            height={846}
            alt={property.TituloSite}
            className="h-[282px] w-full object-cover object-center"
          />
        </div>

        <span className="font-inter text-sm font-medium leading-[18px] text-title block uppercase">
          {category}
        </span>

        <header>
          <h2 className="text-gold font-montserrat text-[22px] leading-[26px] font-light mb-[5px]">
            {property.TituloSite}
          </h2>
        </header>

        <p className="font-inter text-content text-[17px] leading-[22px]">
          <strong className="font-semibold">{property.Bairro}</strong>, {city}/{property.UF}<br />
          <strong className="font-semibold">{property.AreaPrivativa} m²</strong> de Área Privativa 
          {Number(property.Dormitorios) > 0 && ` | ${property.Dormitorios} Dormitórios`}
        </p>

        <hr 
          className="border-0 my-[10px] w-full bg-gold h-[1px]"
        />

        <p className="font-montserrat text-[20px] md:text-[22px] text-title tracking-[-1.1px]">
          <strong>
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(property.ValorVenda || property.ValorLocacao))}
          </strong>
          <span> - {property.Status}</span>
        </p>
      </Link>
    </article>
  )
}
import { Property } from "@/entities/Property";
import Image from "next/image";
import Link from "next/link";

interface CardPropertySingleProps {
  property: Property
}

export function CardPropertySingle({ property }: CardPropertySingleProps) {
  const featuredImageUrl = property.medias?.filter((media) => media.mediaType === 'featured_image')[0]?.url;
  const category = property.types?.[0]?.name;

  return (
    <article>
      <Link href={`/imovel/${property.slug}`}>
        <div className="rounded-[0_20px_20px_20px] overflow-hidden relative mb-[10px]">
          <div 
            className="w-full h-[80px] bg-gradient-to-b from-[#000000] to-[#54545400] absolute top-0 left-0"
          />
          <p className="font-inter font-normal text-[14px] text-white leading-5 absolute top-[15px] left-[15px] uppercase w-full max-w-[140px]">
            {property.delivery}
          </p>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${featuredImageUrl!}`}
            width={1128}
            height={846}
            alt={property.title}
            className="h-[282px] w-full object-cover object-center"
          />
        </div>

        <span className="font-inter text-sm font-normal leading-[17px] text-title block uppercase">
          {category}
        </span>

        <header>
          <h2 className="text-gold font-montserrat text-[22px] leading-[26px] mb-[5px]">
            {property.title}
          </h2>
        </header>

        <p className="font-inter text-content text-[17px] leading-[25px]">
          <strong className="font-semibold">{property.neighborhood?.name}</strong>, {property.city?.name}<br />
          <strong className="font-semibold">{property.privateArea} m²</strong> de Área Privativa | {property.bedrooms} Dormitórios
        </p>

        <hr 
          className="border-0 my-[10px] w-full bg-gold h-[1px]"
        />

        <p className="font-montserrat text-[20px] md:text-[22px] text-title tracking-[-1.1px]">
          <strong>
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(property.price))}
          </strong>
          <span> - Venda</span>
        </p>
      </Link>
    </article>
  )
}
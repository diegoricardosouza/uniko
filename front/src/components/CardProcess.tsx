import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

interface CardProcessProps {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  textButton: string;
  linkButton: string;
}

export function CardProcess({ title, subtitle, description, imageUrl, linkButton, textButton }: CardProcessProps) {
  return (
    <article className="pr-[10xp] flex flex-col md:flex-row gap-5 relative">
      <div className="w-full md:max-w-[320px] bg-black rounded-[20px_20px_0px_20px] absolute top-0 left-0 p-5 z-10">
        <span className="text-white font-inter text-[14px] font-normal leading-[19px] mb-[5px]">
          {subtitle}
        </span>
        <p className="text-gold font-montserrat font-semibold text-[22px] leading-[26px]">
          {title}
        </p>
      </div>

      <div className="md:mt-[130px] w-full md:max-w-[183px] order-2 md:order-1">
        <p className="text-title font-montserrat font-medium text-[18px] leading-[22px]">
          {description}
        </p>
      </div>

      <div className="flex-1 relative order-1 md:order-2">
        <Link href={linkButton} className="button-geral hover:!bg-gold absolute right-0 bottom-5 shadow-[0px_3px_6px_#00000029]">
          {textButton}
          <LuArrowRight className="w-[15px] h-[15px] lg:w-[18px] lg:h-[18px] ml-[-3px]" />
        </Link>

        <Image 
          src={imageUrl}
          alt={title}
          width={357}
          height={300}
        />
      </div>
    </article>
  )
}
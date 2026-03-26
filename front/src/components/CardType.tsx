import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface CardTypeProps {
  title: string;
  content: string;
  image: string;
  width: number;
  height: number;
  link: string;
  position?: 'Cima Esquerda' | 'Cima Direita' | 'Baixo Direita'
}

export function CardType({ image, position, title, content, width, height, link }: CardTypeProps) {
  return (
    <Link href={link} className="relative group">
      <div 
        className={cn(
          'w-full max-w-[271px] bg-gold rounded-[20px_20px_0_20px] px-[20px] py-[17px] absolute transition-all group-hover:bg-black',
          position === 'Cima Esquerda' && 'top-0 left-0',
          position === 'Cima Direita' && 'top-0 right-0',
          position === 'Baixo Direita' && 'bottom-0 right-0 max-w-[290px]',
        )}
      >
        <h5 
          className="title-card"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p
          className="font-montserrat text-[18px] leading-[22px] text-white font-normal"
        >
          {content}
        </p>
      </div>

      <Image 
        src={image}
        alt={title}
        width={width}
        height={height}
        unoptimized
      />
    </Link>
  )
}
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

interface CardTypeHomeProps {
  title: string;
  imageUrl: string;
  link: string;
  className?: string;
}

export function CardTypeHome({ className, title, imageUrl, link }: CardTypeHomeProps) {
  return (
    <article 
      className={cn(
        "w-full max-w-[220px] mx-auto",
        className
      )}
    >
      <Link href={link} className="card-type-button">
        <Image 
          src={imageUrl}
          alt={title}
          width={220}
          height={205}
          unoptimized
        />

        <div className="card-title">
          {title}
          <LuArrowRight className="w-[15px] h-[15px] lg:w-[18px] lg:h-[18px] ml-[-3px]" />
        </div>
      </Link>
    </article>
  )
}
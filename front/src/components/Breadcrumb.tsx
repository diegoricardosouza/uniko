"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface BreadcrumbProps {
  title: string;
}

export function Breadcrumb({ title }: BreadcrumbProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const searchParams = useSearchParams();
  const city = searchParams.get('city');
  const nameCity = city && city === 'curitiba' ? 'CURITIBA' : 'BELO HORIZONTE'

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // 90px no mobile, 110px no desktop
      const scrollThreshold = window.innerWidth < 768 ? 90 : 67;
      setIsScrolled(scrollPosition > scrollThreshold);
    };

    // Adiciona os listeners de scroll e resize
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    // Limpa os listeners quando o componente é desmontado
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={cn(
          `bg-gold sticky top-[90px] md:top-[110px] z-50 transition-all duration-300 ${isScrolled
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-full pointer-events-none'
          }`
        )}
      >
        <div className="container py-[14px]">
          <ul className="breadcrumb-list">
            <li>
              <Link href="/">HOME</Link>
            </li>

            {city && (
              <>
                <li>{">"}</li>
                <li>{nameCity}</li>
              </>
            )}

            <li>{">"}</li>

            <li>
              {title}
            </li>
          </ul>
        </div>
      </div>

      <div
        className={cn(
          `bg-gold mt-[-47px] transition-all duration-300 ${isScrolled
            ? 'opacity-0 -translate-y-4 pointer-events-none'
            : 'opacity-100 translate-y-0'
          }`
        )}
      >
        <div className="container py-[10px]">
          <h1
            className="text-[30px] md:text-[36px] font-montserrat text-white font-light leading-[40px] md:leading-[47px] text-center"
          >
            {title}
          </h1>
        </div>
      </div>
    </>
  );
}
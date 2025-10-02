'use client'
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useSwiper } from "swiper/react";

interface SliderNavigationProps {
  isBeginning: boolean;
  isEnd: boolean;
}

export function SliderNavigation({
  isBeginning,
  isEnd,
}: SliderNavigationProps) {
  const swiper = useSwiper();

  return (
    <div className="flex gap-[10px] absolute right-5 bottom-5 !z-20">
      <button
        className="w-[37px] h-[37px] !rounded-[10px_10px_0px_10px] bg-white shadow-[3px_3px_6px_#00000066] flex items-center justify-center enabled:hover:bg-gold group transition-colors disabled:opacity-40"
        onClick={() => swiper.slidePrev()}
        disabled={isBeginning}
      >
        <ChevronLeftIcon className="text-gold w-5 h-5 group-hover:text-white group-disabled:text-gold" />
      </button>

      <button
        className="w-[37px] h-[37px] !rounded-[10px_10px_10px_0px] bg-white shadow-[3px_3px_6px_#00000066] flex items-center justify-center enabled:hover:bg-gold group transition-colors disabled:opacity-40"
        onClick={() => swiper.slideNext()}
        disabled={isEnd}
      >
        <ChevronRightIcon className="text-gold w-5 h-5 group-hover:text-white group-disabled:text-gold" />
      </button>
    </div>
  )
}
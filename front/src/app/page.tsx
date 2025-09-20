/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MenuHome } from "@/components/Header/MenuHome";
import { Socials } from "@/components/Socials";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { LuArrowRight } from "react-icons/lu";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function Home() {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cria script do YouTube API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    // Função chamada quando API estiver pronta
    window.onYouTubeIframeAPIReady = () => {
      if (playerRef.current) {
        new window.YT.Player(playerRef.current, {
          videoId: "6Q5Nv5h0qKw", // ID do vídeo
          playerVars: {
            autoplay: 1,
            controls: 0,
            rel: 0,
            modestbranding: 1,
            fs: 0,
            disablekb: 1,
            loop: 1,
            playlist: "6Q5Nv5h0qKw",
          },
          events: {
            onReady: (event: any) => {
              event.target.mute(); // muta o áudio
              event.target.playVideo(); // força autoplay
            },
          },
        });
      }
    };
  }, []);

  return (
    <div>
      <div className="relative h-screen">
        <div 
          className="absolute top-0 left-0 w-full h-full bg-black/45 flex flex-col" 
        >
          <header className="w-full bg-black">
            <div className="container grid grid-cols-2 lg:grid-cols-3">
              <div className="hidden lg:block"></div>
              <div className="flex justify-center my-[15px] lg:my-[25px]">
                <Link href="/">
                  <Image
                    src="/logo.png"
                    width={180}
                    height={60}
                    alt="Logo Úniko"
                    title="Logo Úniko"
                  />
                </Link>
              </div>
              <div className="flex justify-end items-center gap-3.5">
                <MenuHome />
                <div className="hidden lg:block">
                  <Socials />
                </div>
              </div>
            </div>
          </header>

          <div className="flex flex-col items-center justify-center h-full flex-1">
            <h1 
              className="text-white text-[40px] leading-[43px] lg:text-[48px] lg:leading-[58px] font-normal font-montserrat text-center mb-10"
            >
              O IMÓVEL DOS SEUS SONHOS<br />
              <strong>É ESPECIAL E ÚNIKO</strong>
            </h1>

            <div className="flex justify-center gap-4 lg:gap-8">
              <Link 
                href="#" 
                className="flex items-center bg-white text-[#343434] px-[18px] py-[13px] lg:px-[20px] lg:py-[15px] font-montserrat text-[15px] leading-[19px] lg:text-[18px] lg:leading-[22px] font-semibold gap-[3px] shadow-[0px_3px_6px_#00000029] transition-all hover:bg-[#C5AF62] hover:text-white mb-2.5 lg:mb-0 justify-center"
              >
                Curitiba <LuArrowRight className="w-[15px] h-[15px] lg:w-[19px] lg:h-[19px]" />
              </Link>

              <Link
                href="#"
                className="flex items-center bg-white text-[#343434] px-[18px] py-[13px] lg:px-[20px] lg:py-[15px] font-montserrat text-[15px] leading-[19px] lg:text-[18px] lg:leading-[22px] font-semibold gap-[3px] shadow-[0px_3px_6px_#00000029] transition-all hover:bg-[#C5AF62] hover:text-white mb-2.5 lg:mb-0 justify-center"
              >
                Belo Horizonte <LuArrowRight className="w-[15px] h-[15px] lg:w-[19px] lg:h-[19px]" />
              </Link>
            </div>
          </div>
        </div>

        <div
          ref={playerRef}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

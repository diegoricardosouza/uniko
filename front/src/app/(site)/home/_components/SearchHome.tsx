/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { FormTab } from "./FormTab";

export function SearchHome() {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initPlayer = () => {
      if (playerRef.current && window.YT && window.YT.Player) {
        new window.YT.Player(playerRef.current, {
          videoId: "mnQCKVjSYcc",
          playerVars: {
            autoplay: 1,
            controls: 0,
            rel: 0,
            modestbranding: 1,
            fs: 0,
            disablekb: 1,
            loop: 1,
            playlist: "mnQCKVjSYcc",
            mute: 1,
          },
          events: {
            onReady: (event: any) => {
              event.target.mute();
              event.target.playVideo();
            },
          },
        });
      }
    };

    // Verifica se a API do YouTube já está carregada
    if (window.YT && window.YT.Player) {
      // API já está disponível, inicializa o player imediatamente
      initPlayer();
    } else {
      // API não está carregada, verifica se o script já existe
      const existingScript = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]',
      );

      if (!existingScript) {
        // Cria o script apenas se não existir
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }

      // Define a função de callback
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    // Cleanup (opcional)
    return () => {
      // Remove o player se necessário
    };
  }, []);

  return (
    <div className="relative h-[500px] md:h-[640px] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-black/45 flex items-center z-10">
        <div className="container flex flex-col md:flex-row">
          <div className="bg-black/90 p-[20px] md:py-[55px] md:px-[25px] md:rounded-[20px_0px_0px_20px]">
            <Image
              src="/logo.png"
              width={149}
              height={50}
              alt="Logo Úniko Imóveis"
              className="mx-auto"
            />
          </div>

          <div className="bg-black/65 md:px-[25px] md:py-[30px] md:rounded-[0px_20px_20px_0px] flex-1">
            <Tabs defaultValue="comprar" className="gap-0">
              <TabsList className="search-tablist mb-[2px]">
                <TabsTrigger value="comprar" className="search-tab">
                  Comprar
                </TabsTrigger>
                <TabsTrigger value="alugar" className="search-tab">
                  Alugar
                </TabsTrigger>
                <TabsTrigger value="lancamentos" className="search-tab">
                  Lançamentos
                </TabsTrigger>
              </TabsList>
              <TabsContent value="comprar">
                <FormTab type="comprar" />
              </TabsContent>
              <TabsContent value="alugar">
                <FormTab type="alugar" />
              </TabsContent>
              <TabsContent value="lancamentos">
                <FormTab type="lancamentos" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="relative w-screen h-screen overflow-hidden">
        <div
          ref={playerRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full"
        />
      </div>
    </div>
  );
}

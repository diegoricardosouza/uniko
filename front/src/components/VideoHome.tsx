/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function VideoHome() {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initPlayer = () => {
      if (playerRef.current && window.YT && window.YT.Player) {
        new window.YT.Player(playerRef.current, {
          videoId: "6Q5Nv5h0qKw",
          playerVars: {
            autoplay: 1,
            controls: 0,
            rel: 0,
            modestbranding: 1,
            fs: 0,
            disablekb: 1,
            loop: 1,
            playlist: "6Q5Nv5h0qKw",
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
      const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');

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
    <div className="relative w-screen h-screen overflow-hidden">
      <div
        ref={playerRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full"
      />
    </div>
  )
}
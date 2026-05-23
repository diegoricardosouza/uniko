"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef } from "react";

export function VideoBH() {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initPlayer = () => {
      if (playerRef.current && window.YT && window.YT.Player) {
        new window.YT.Player(playerRef.current, {
          videoId: "IDk5VcShjbE",
          playerVars: {
            autoplay: 1,
            controls: 0,         // Remove controles
            rel: 0,              // Sem vídeos relacionados
            modestbranding: 1,   // Reduz branding do YouTube
            fs: 0,               // Sem botão fullscreen
            disablekb: 1,        // Desativa teclado
            loop: 1,             // Loop infinito
            playlist: "IDk5VcShjbE",
            mute: 1,
            iv_load_policy: 3,   // Remove anotações
            cc_load_policy: 0,   // Remove legendas automáticas
            playsinline: 1,      // Evita fullscreen automático no mobile
            showinfo: 0,         // Remove info do vídeo (título, uploader)
            color: "white",      // Barra de progresso branca (menos visível)
            origin: typeof window !== "undefined" ? window.location.origin : "",
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
    <div className="relative w-screen h-screen overflow-hidden">
      <div
        ref={playerRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full"
      />
    </div>
  )
}
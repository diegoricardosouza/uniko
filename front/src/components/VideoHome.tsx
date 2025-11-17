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
    <div className="relative w-screen h-screen overflow-hidden">
      <div
        ref={playerRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] h-[56.25vw] min-w-full min-h-full"
      />
    </div>
  )
}
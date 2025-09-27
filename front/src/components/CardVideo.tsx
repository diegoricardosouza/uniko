/* eslint-disable @next/next/no-img-element */
import { formatDuration, YouTubeVideo } from "@/lib/youtube";
import { Play } from "lucide-react";
import { useState } from "react";
import { VideoModal } from "./VideoModal";

interface CardVideoProps {
  video: YouTubeVideo
}

export function CardVideo({ video }: CardVideoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);

  const openVideoModal = (video: YouTubeVideo) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="group cursor-pointer transform transition-all duration-300"
        onClick={() => openVideoModal(video)}
      >
        <div className="relative">
          {/* Thumbnail com overlay */}
          <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={video.thumbnails.maxres?.url || video.thumbnails.high.url}
              alt={video.title}
              className="w-full h-full object-cover transition-transform"
              loading="lazy"
            />

            {/* Overlay escuro no hover */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Botão Play */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                <Play className='w-6 h-6 fill-white text-white' />
              </div>
            </div>

            {/* Duração */}
            {video.duration && (
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-mono">
                {formatDuration(video.duration)}
              </div>
            )}
          </div>

          {/* Informações do vídeo */}
          <div className="p-3 pl-0">
            <h4 className="font-montserrat font-semibold text-sm line-clamp-2 text-title leading-tight">
              {video.title}
            </h4>
          </div>
        </div>
      </div>

      {selectedVideo && (
        <VideoModal
          isOpen={isModalOpen}
          onClose={closeVideoModal}
          videoId={selectedVideo.id}
          title={selectedVideo.title}
        />
      )}
    </>
  )
}
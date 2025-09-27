'use client';

import { YouTubeChannel, YouTubeVideo } from '@/lib/youtube';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LuArrowRight } from 'react-icons/lu';
import { CardVideo } from './CardVideo';
import { HeaderYoutube } from './HeaderYoutube';
import { Spinner } from './Spinner';

interface YouTubeData {
  channel: YouTubeChannel;
  videos: YouTubeVideo[];
  totalVideos: number;
  nextPageToken?: string;
  hasMore?: boolean;
}

const URL_YOUTUBE = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL || 'https://www.youtube.com/@unikoimoveis9155';

export default function YouTubeVideosList() {
  const [data, setData] = useState<YouTubeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState(URL_YOUTUBE);
  
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/youtube?url=${encodeURIComponent(url)}&maxResults=12`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Erro ao buscar vídeos');
        }

        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };
    fetchVideos()
  },[url])

  const loadMoreVideos = async () => {
    if (!data?.nextPageToken || loadingMore) return;

    setLoadingMore(true);

    try {
      const response = await fetch(
        `/api/youtube?url=${encodeURIComponent(url)}&maxResults=12&pageToken=${data.nextPageToken}&loadMore=true`
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao carregar mais vídeos');
      }

      setData(prev => ({
        ...prev!,
        videos: [...prev!.videos, ...result.videos],
        nextPageToken: result.nextPageToken,
        hasMore: result.hasMore,
        totalVideos: prev!.totalVideos + result.totalVideos
      }));

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar mais vídeos');
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className='mb-[55px]'>
      {loading ? (
        <div className='flex justify-center bg-white w-full h-full'>
          <Spinner />
        </div>
      ) : (
        <>
          <HeaderYoutube
            title={data?.channel.title}
            description={data?.channel.description}
            linkYoutube={URL_YOUTUBE}
          />

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded font-montserrat">
              {error}
            </div>
          )}

          {data && (
            <div className='mt-10'>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {data.videos.map((video) => (
                  <CardVideo 
                    key={video.id}
                    video={video}
                  />
                ))}
              </div>

              {/* Botão Carregar Mais */}
              {data.hasMore && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={loadMoreVideos}
                    disabled={loadingMore}
                    className="disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loadingMore ? (
                      <div className="button-geral !bg-black hover:!bg-gold !text-white">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Carregando mais vídeos...
                      </div>
                    ) : (
                      <div className="button-geral !bg-black hover:!bg-gold !text-white">
                        Carregar Mais Vídeos
                        <LuArrowRight className="w-[15px] h-[15px] lg:w-[18px] lg:h-[18px] ml-[-3px]" />
                      </div>
                    )}
                  </button>
                </div>
              )}

              {/* Indicador quando não há mais vídeos */}
              {data.videos.length > 0 && !data.hasMore && (
                <div className="text-center mt-8 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 font-montserrat">🎉 Você chegou ao fim! Todos os vídeos foram carregados.</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
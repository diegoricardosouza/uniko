'use client';

import { getSettingsAction } from "@/app/actions/settings/get-settings";
import { CardVideo } from "@/components/CardVideo";
import { Spinner } from "@/components/Spinner";
import { YouTubeData } from "@/components/YouTubeVideosList";
import { useEffect, useState } from "react";

export function VideosHome() {
  const [data, setData] = useState<YouTubeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState('');

  useEffect(() => {
    const settings = async () => {
      const response = await getSettingsAction();
      setUrl(response[0].urlYoutube || '')
    }

    settings();
  }, [])

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);

      try {
        if (url) {
          const response = await fetch(`/api/youtube?url=${encodeURIComponent(url)}&maxResults=4`);
          const result = await response.json();

          if (!response.ok) {
            throw new Error(result.error || 'Erro ao buscar vídeos');
          }

          setData(result);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };
    fetchVideos()
  }, [url])

  return (
    <div>
      {loading ? (
        <div className='flex justify-center bg-white w-full h-full'>
          <Spinner />
        </div>
      ) : (
        <>
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded font-montserrat">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data?.videos.map((video) => (
              <CardVideo 
                key={video.id}
                video={video}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
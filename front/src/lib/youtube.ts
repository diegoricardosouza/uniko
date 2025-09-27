/* eslint-disable @typescript-eslint/no-explicit-any */
export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnails: {
    default: { url: string };
    medium: { url: string };
    high: { url: string };
    maxres?: { url: string };
  };
  statistics?: {
    viewCount: string;
    likeCount: string;
    commentCount: string;
  };
  duration?: string;
}

export interface YouTubeChannel {
  id: string;
  title: string;
  description: string;
  subscriberCount: string;
  videoCount: string;
  viewCount: string;
}

// Converter duração do formato ISO 8601 para MM:SS
export function formatDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  if (!match) return '0:00';

  const hours = parseInt(match[1]?.replace('H', '') || '0');
  const minutes = parseInt(match[2]?.replace('M', '') || '0');
  const seconds = parseInt(match[3]?.replace('S', '') || '0');

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

// Extrair o ID do canal da URL
export function extractChannelId(url: string): string | null {
  const regex = /@([a-zA-Z0-9_-]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Buscar informações do canal pelo handle
export async function getChannelByHandle(handle: string): Promise<YouTubeChannel | null> {
  const API_KEY = process.env.YOUTUBE_API_KEY;

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&forHandle=${handle}&key=${API_KEY}`
    );

    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const channel = data.items[0];
      return {
        id: channel.id,
        title: channel.snippet.title,
        description: channel.snippet.description,
        subscriberCount: channel.statistics.subscriberCount,
        videoCount: channel.statistics.videoCount,
        viewCount: channel.statistics.viewCount,
      };
    }

    return null;
  } catch (error) {
    console.error('Erro ao buscar canal:', error);
    return null;
  }
}

// Buscar vídeos do canal
export async function getChannelVideos(channelId: string, maxResults: number = 50, pageToken?: string): Promise<{ videos: YouTubeVideo[], nextPageToken?: string }> {
  const API_KEY = process.env.YOUTUBE_API_KEY;

  try {
    // Primeiro, buscar os vídeos do canal
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${maxResults}&order=date&type=video&key=${API_KEY}${pageToken ? `&pageToken=${pageToken}` : ''}`;

    const searchResponse = await fetch(searchUrl);

    const searchData = await searchResponse.json();

    if (!searchData.items || searchData.items.length === 0) {
      return { videos: [], nextPageToken: undefined };
    }

    // Extrair IDs dos vídeos
    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');

    // Buscar estatísticas dos vídeos (incluindo duração)
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${API_KEY}`
    );

    const videosData = await videosResponse.json();

    const videos = videosData.items.map((video: any) => ({
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      publishedAt: video.snippet.publishedAt,
      thumbnails: video.snippet.thumbnails,
      statistics: video.statistics,
      duration: video.contentDetails.duration,
    }));

    return {
      videos,
      nextPageToken: searchData.nextPageToken
    };

  } catch (error) {
    console.error('Erro ao buscar vídeos:', error);
    return { videos: [], nextPageToken: undefined };
  }
}
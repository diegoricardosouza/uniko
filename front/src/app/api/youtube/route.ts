import { extractChannelId, getChannelByHandle, getChannelVideos } from '@/lib/youtube';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const channelUrl = searchParams.get('url');
  const maxResults = parseInt(searchParams.get('maxResults') || '12');
  const pageToken = searchParams.get('pageToken') || undefined;
  const loadMore = searchParams.get('loadMore') === 'true';

  if (!channelUrl) {
    return NextResponse.json({ error: 'URL do canal é obrigatória' }, { status: 400 });
  }

  try {
    // Extrair handle do canal da URL
    const handle = extractChannelId(channelUrl);

    if (!handle) {
      return NextResponse.json({ error: 'URL do canal inválida' }, { status: 400 });
    }

    let channel = null;

    // Buscar informações do canal apenas se não for loadMore
    if (!loadMore) {
      channel = await getChannelByHandle(handle);

      if (!channel) {
        return NextResponse.json({ error: 'Canal não encontrado' }, { status: 404 });
      }
    } else {
      // Para loadMore, precisamos do channelId do pageToken ou buscar novamente
      channel = await getChannelByHandle(handle);
      if (!channel) {
        return NextResponse.json({ error: 'Canal não encontrado' }, { status: 404 });
      }
    }

    // Buscar vídeos do canal
    const { videos, nextPageToken } = await getChannelVideos(channel.id, maxResults, pageToken);

    return NextResponse.json({
      ...(loadMore ? {} : { channel }),
      videos,
      nextPageToken,
      totalVideos: videos.length,
      hasMore: !!nextPageToken
    });

  } catch (error) {
    console.error('Erro na API:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
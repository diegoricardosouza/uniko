import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json(
      { error: 'Código do imóvel é obrigatório' },
      { status: 400 }
    );
  }

  const filters = {
    fields: [
      { Foto: ['Foto', 'Destaque'] }
    ]
  };

  const searchParamsApi = JSON.stringify(filters);
  const encodedParams = encodeURIComponent(searchParamsApi);
  const url = `${process.env.NEXT_PUBLIC_VISTA_API_URL}/imoveis/detalhes?key=${process.env.VISTA_API_KEY}&v2=1&imovel=${code}&pesquisa=${encodedParams}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Erro na API Vista: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);

  } catch (error) {
    console.error('Erro ao buscar fotos do imóvel:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar fotos do imóvel' },
      { status: 500 }
    );
  }
}
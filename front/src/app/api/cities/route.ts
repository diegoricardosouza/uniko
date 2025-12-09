import { NextResponse } from 'next/server';

export async function GET() {
  const filters = {
    fields: ['Cidade']
  };

  const searchParamsApi = JSON.stringify(filters);
  const encodedParams = encodeURIComponent(searchParamsApi);
  const url = `${process.env.NEXT_PUBLIC_VISTA_API_URL}/imoveis/listarConteudo?key=${process.env.VISTA_API_KEY}&pesquisa=${encodedParams}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro ao buscar cidades:', error);
    return NextResponse.json({ error: 'Erro ao buscar cidades' }, { status: 500 });
  }
}
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cidade = searchParams.get("cidade");

  if (!cidade) {
    return NextResponse.json({ Bairro: [] });
  }

  const filters = {
    fields: ["Bairro"],
    filter: {
      Cidade: cidade,
    },
    order: {
      Bairro: "asc",
    },
  };

  const searchParamsApi = JSON.stringify(filters);
  const encodedParams = encodeURIComponent(searchParamsApi);
  const url = `${process.env.NEXT_PUBLIC_VISTA_API_URL}/imoveis/listarConteudo?key=${process.env.VISTA_API_KEY}&pesquisa=${encodedParams}`;

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data?.Bairro)) {
      data.Bairro = [...data.Bairro].sort((a: string, b: string) =>
        a.localeCompare(b, "pt-BR", { sensitivity: "base" })
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar bairros:", error);
    return NextResponse.json(
      { error: "Erro ao buscar bairros" },
      { status: 500 }
    );
  }
}
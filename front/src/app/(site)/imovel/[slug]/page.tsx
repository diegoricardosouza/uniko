import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import NotFound from "@/components/NotFound";
import { PropertyVistaFoto, PropertyVistaList, PropertyVistaVideos } from "@/entities/PropertyVista";
import { Metadata } from "next";
import { CarouselImages } from "./_components/CarouselImages";
import { ContentProperty } from "./_components/ContentProperty";
import { RelatedProperties } from "./_components/RelatedProperties";

interface SinglePropertyProps {
  params: Promise<{ slug: string; }>;
}

export type PropertyVistaList2 = {
  0: PropertyVistaList;
  Foto: PropertyVistaFoto[];
  Video: PropertyVistaVideos;
}

const filters = {
  fields: [
    'TituloSite', 'Dormitorios', 'UF', 'Bairro', 'Cidade', 'ValorVenda', 'ValorIptu', 'ValorCondominio', 'DescricaoWeb',
    'ValorLocacao', 'AreaPrivativa', 'AreaTotal', 'FotoDestaque', 'Codigo', 'Vagas', 'TotalBanheiros', 'DataEntrega', 'DescricaoEmpreendimento',
    'TotalBanheiros', 'Status', 'Categoria', 'Endereco', 'Numero', 'Complemento', 'Caracteristicas', 'InfraEstrutura',
    { Foto: ['Foto', 'Destaque', 'FotoOriginal', 'Ordem'] },
    { Video: ['Video', 'Codigo', 'VideoCodigo'] }
  ]
};

export async function generateMetadata({ params }: SinglePropertyProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const searchParamsApi = JSON.stringify(filters);
    const encodedParams = encodeURIComponent(searchParamsApi);
    const url = `${process.env.NEXT_PUBLIC_VISTA_API_URL}/imoveis/detalhes?key=${process.env.VISTA_API_KEY}&v2=1&imovel=${slug}&pesquisa=${encodedParams}`;

    const property = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store'
    });

    if (!property) {
      return {
        title: "Imóvel não encontrado - Úniko Imóveis",
        description: "Úniko Imóveis - Cada imóvel tem seu jeito ÚNIKO e você tem o seu!",
      };
    }

    const data: PropertyVistaList[] = await property.json();

    const featuredImage = data[0].FotoDestaque;

    return {
      title: `${data[0].TituloSite} - Úniko Imóveis`,
      description: data[0].DescricaoEmpreendimento || "Úniko Imóveis - Cada imóvel tem seu jeito ÚNIKO e você tem o seu!",
      openGraph: {
        title: data[0].TituloSite,
        description: data[0].DescricaoEmpreendimento,
        // images: featuredImage ? [`${process.env.NEXT_PUBLIC_API_URL}${featuredImage}`] : [],
        images: featuredImage ? [`${featuredImage}`] : [],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: data[0].TituloSite,
        description: data[0].DescricaoEmpreendimento,
        // images: featuredImage ? [`${process.env.NEXT_PUBLIC_API_URL}${featuredImage}`] : [],
        images: featuredImage ? [`${featuredImage}`] : [],
      },
    };
  } catch (error) {
    console.error('Erro ao gerar metadata:', error);

    return {
      title: "Erro - Úniko Imóveis",
      description: "Úniko Imóveis - Cada imóvel tem seu jeito ÚNIKO e você tem o seu!",
    };
  }
}

export default async function SingleImovel({ params }: SinglePropertyProps) {
  const { slug } = await params;
  
  try {
    const searchParamsApi = JSON.stringify(filters);
    const encodedParams = encodeURIComponent(searchParamsApi);
    const url = `${process.env.NEXT_PUBLIC_VISTA_API_URL}/imoveis/detalhes?key=${process.env.VISTA_API_KEY}&v2=1&imovel=${slug}&pesquisa=${encodedParams}`;

    const property = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store'
    });

    if (!property) {
      return (
        <div>
          <Header />
          <main className="container py-20">
            <NotFound />
          </main>
          <Footer />
        </div>
      );
    }

    const data: PropertyVistaList2 = await property.json();
    const dataProperty = {
      ...data[0],
      Foto: Object.values(data.Foto),
      Video: data.Video ?? {}
    }

    return (
      <div>
        <Header />

        <main>
          <CarouselImages property={dataProperty} />
          <ContentProperty property={dataProperty} />
          <RelatedProperties 
            idCurrentProperty={dataProperty.Codigo} 
            ufCurrentProperty={dataProperty.UF} 
            finality={dataProperty.Status}
          />
        </main>

        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Erro ao carregar post:', error);

    return (
      <div>
        <Header />
        <main className="container py-20">
          <NotFound />
        </main>
        <Footer />
      </div>
    );
  }
}
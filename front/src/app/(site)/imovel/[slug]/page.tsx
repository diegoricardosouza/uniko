import { getPropertySlugAction } from "@/app/actions/properties/get-property-slug";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import NotFound from "@/components/NotFound";
import { Metadata } from "next";
import { CarouselImages } from "./_components/CarouselImages";
import { ContentProperty } from "./_components/ContentProperty";
import { RelatedProperties } from "./_components/RelatedProperties";

interface SinglePropertyProps {
  params: { slug: string; };
}

export async function generateMetadata({ params }: SinglePropertyProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const property = await getPropertySlugAction(slug);

    if (!property) {
      return {
        title: "Imóvel não encontrado - Úniko Imóveis",
        description: "Úniko Imóveis - Melhores imóveis no Brasil",
      };
    }

    const featuredImage = property?.medias?.find(media => media.mediaType === 'featured_image')?.url;

    return {
      title: `${property.title} - Úniko Imóveis`,
      description: property.description || "Úniko Imóveis - Melhores imóveis no Brasil",
      openGraph: {
        title: property.title,
        description: property.description,
        images: featuredImage ? [`${process.env.NEXT_PUBLIC_API_URL}${featuredImage}`] : [],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: property.title,
        description: property.description,
        images: featuredImage ? [`${process.env.NEXT_PUBLIC_API_URL}${featuredImage}`] : [],
      },
    };
  } catch (error) {
    console.error('Erro ao gerar metadata:', error);

    return {
      title: "Erro - Úniko Imóveis",
      description: "Úniko Imóveis - Melhores imóveis no Brasil",
    };
  }
}

export default async function SingleImovel({ params }: SinglePropertyProps) {
  const { slug } = await params;
  
  try {
    const property = await getPropertySlugAction(slug);

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

    return (
      <div>
        <Header />

        <main>
          <CarouselImages property={property} />
          <ContentProperty property={property} />
          <RelatedProperties idCurrentProperty={property.id} />
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
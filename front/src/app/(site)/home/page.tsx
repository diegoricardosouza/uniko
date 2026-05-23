import { getSettingsAction } from "@/app/actions/settings/get-settings";
import { CardProcess } from "@/components/CardProcess";
import { CardTypeHome } from "@/components/CardTypeHome";
import { DifferentiatedService } from "@/components/DifferentiatedService";
import { FeaturedTypes } from "@/components/FeaturedTypes";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Metadata } from "next";
import Image from "next/image";
import { SearchHome } from "./_components/SearchHome";
import { VideosHome } from "./_components/VideosHome";

export const dynamic = 'force-dynamic';

interface HomeProps {
  searchParams: Promise<{
    city?: string;
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSettingsAction();

    if (!settings) {
      return {
        title: "Item não encontrado - Úniko Imóveis",
        description: "Úniko Imóveis - Cada imóvel tem seu jeito ÚNIKO e você tem o seu!",
      };
    }

    return {
      // title: `${settings[0].titleSeo} - Úniko Imóveis`,
      title: `Úniko Imóveis`,
      description: settings[0].descriptionSeo || "Úniko Imóveis - Cada imóvel tem seu jeito ÚNIKO e você tem o seu!",
      openGraph: {
        title: settings[0].titleSeo,
        description: settings[0].descriptionSeo,
        images: '/logo.png',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: settings[0].titleSeo,
        description: settings[0].descriptionSeo,
        images: '/logo.png',
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

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  return (
    <div>
      <Header />

      <main>
        <SearchHome city={params.city} />
        
        <div className="container">
          <div className="mt-[40px] mb-10">
            <FeaturedTypes />
          </div>
        </div>

        <DifferentiatedService />

        <div className="container !mt-10">
          <h2 className="text-gold text-[30px] text-center md:text-[38px] font-montserrat tracking-[-0.95px] font-light leading-[35px] md:leading-[42px] mb-[30px]">
            Facilidade nos processos imobiliários é <strong className="font-medium">Úniko!</strong>
          </h2>

          <div className="flex flex-col md:grid grid-cols-2 gap-5 md:gap-[60px]">
            <CardProcess 
              title="Quer Vender ou Alugar um imóvel seu?"
              subtitle="ANUNCIAR MEU IMÓVEL"
              description="Temos especialistas em imóveis diferenciados nas regiões de Curitiba e Belo Horizonte, prontos para te ajudar!"
              imageUrl="/img-anuncie.png"
              textButton="QUERO ANUNCIAR"
              linkButton="/anunciar-imovel"
            />

            <CardProcess 
              title="Procurando o imóvel Úniko dos seus sonhos?"
              subtitle="ENCONTRAR UM IMÓVEL"
              description="Nossos consultores terão prazer em ajudar a encontrar um lar Úniko, como você e sua família merecem."
              imageUrl="/img-encontrar.png"
              textButton="QUERO ENCONTRAR"
              linkButton="/procurar-imovel"
            />
          </div>
        </div>

        <section className="bg-black mt-10 pt-[50px] pb-10">
          <div className="container">
            <header className="text-center mb-[30px]">
              <h2
                className="text-gold text-[30px] md:text-[36px] font-montserrat font-light leading-[35px] md:leading-[47px]"
              >
                O imóvel dos seus sonhos <strong className="font-medium">é especial e Úniko!</strong>
              </h2>

              <h4
                className="text-[19px] md:text-[22px] font-medium text-white leading-[22px] md:leading-[27px] font-montserrat"
              >
                O imóvel que você precisa está aqui na Úniko
              </h4>
            </header>

            <div className="flex flex-col md:grid grid-cols-5 gap-[25px]">
              <CardTypeHome
                title="Apartamentos"
                imageUrl="/tipos/apartamento.png"
                link="/imoveis?type=Apartamento&finalidade=comprar"
              />
              <CardTypeHome
                title="Casas"
                imageUrl="/tipos/casas.png"
                link="/imoveis?type=Casa&finalidade=comprar"
                className="md:mt-[20px]"
              />
              <CardTypeHome
                title="Comerciais"
                imageUrl="/tipos/comerciais.png"
                link="/imoveis?type=Comercial&finalidade=comprar"
              />
              <CardTypeHome
                title="Terrenos"
                imageUrl="/tipos/terrenos.png"
                link="/imoveis?type=Terreno&finalidade=comprar"
                className="md:mt-[20px]"
              />
              <CardTypeHome
                title="Chácaras"
                imageUrl="/tipos/chacaras.png"
                link="/imoveis?type=Chacara&finalidade=comprar"
              />
            </div>
          </div>
        </section>

        <article className="container !mt-10">
          <header className="text-center mb-[30px]">
            <h2
              className="text-gold text-[30px] md:text-[36px] font-montserrat font-light leading-[35px] md:leading-[47px]"
            >
              As novidades mais recentes <strong className="font-medium">estão aqui!</strong>
            </h2>

            <h4
              className="text-[19px] md:text-[22px] font-medium leading-[22px] md:leading-[27px] font-montserrat"
            >
              @unikoimoveis
            </h4>
          </header>

          <div>
            <VideosHome />
          </div>
        </article>

        <div className="flex justify-center mt-[18px]">
          <Image 
            src="/img-video-home.png"
            alt="Úniko Imóveis"
            width={780}
            height={195}
            unoptimized
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}
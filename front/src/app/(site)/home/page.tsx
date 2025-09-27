import { CardProcess } from "@/components/CardProcess";
import { CardTypeHome } from "@/components/CardTypeHome";
import { FeaturedTypes } from "@/components/FeaturedTypes";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { SearchHome } from "./_components/SearchHome";
import { VideosHome } from "./_components/VideosHome";

export const metadata: Metadata = {
  title: "Úniko Imóveis",
  description: "Úniko Imóveis - Melhores imóveis no Brasil",
};

export default async function Home() {
  return (
    <div>
      <Header />

      <main>
        <SearchHome />
        
        <div className="container">
          <div className="mt-[40px] mb-10">
            <FeaturedTypes />
          </div>
        </div>

        <article className="bg-black py-[50px]">
          <div className="container md:flex gap-[100px] items-center">
            <div className="w-full md:max-w-[300px] mb-3 md:mb-0">
              <h2 className="text-gold text-[30px] md:text-[38px] font-montserrat tracking-[-0.95px] font-normal leading-[35px] md:leading-[42px] mb-[5px]">
                Atendimento Diferenciado e <strong className="font-semibold">Personalizado</strong>
              </h2>
            </div>

            <div className="flex-1">
              <p className="text-white font-montserrat leading-[22px] ">As unidades da Úniko <strong className="font-semibold">Negócios Imobiliários</strong> abrigam talentosas equipes de profissionais especialistas em interpretar de maneira clara e objetiva o que o cliente deseja, através de um atendimento diferenciado e personalizado.</p>

              <div className="flex gap-[30px] mt-5">
                <Link href="/contato" className="button-geral hover:!bg-gold">
                  CURITIBA
                  <LuArrowRight className="w-[15px] h-[15px] lg:w-[18px] lg:h-[18px] ml-[-3px]" />
                </Link>

                <Link href="/contato" className="button-geral hover:!bg-gold">
                  FILIAL BELO HORIZONTE
                  <LuArrowRight className="w-[15px] h-[15px] lg:w-[18px] lg:h-[18px] ml-[-3px]" />
                </Link>
              </div>
            </div>
          </div>
        </article>

        <div className="container !mt-10">
          <h2 className="text-gold text-[30px] text-center md:text-[38px] font-montserrat tracking-[-0.95px] font-normal leading-[35px] md:leading-[42px] mb-[30px]">
            Facilidade nos processos imobiliários é <strong className="font-semibold">Úniko!</strong>
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
                className="text-gold text-[30px] md:text-[38px] font-montserrat tracking-[-0.95px] font-normal leading-[35px] md:leading-[47px] mb-[5px]"
              >
                O imóvel dos seus sonhos <strong className="font-semibold">é especial e Úniko!</strong>
              </h2>

              <h4
                className="text-[19px] md:text-[22px] font-semibold text-white leading-[22px] md:leading-[27px] font-montserrat"
              >
                O imóvel que você precisa está aqui na Úniko
              </h4>
            </header>

            <div className="flex flex-col md:grid grid-cols-5 gap-[25px]">
              <CardTypeHome
                title="Apartamentos"
                imageUrl="/tipos/apartamento.png"
                link="#"
              />
              <CardTypeHome
                title="Casas"
                imageUrl="/tipos/casas.png"
                link="#"
                className="md:mt-[20px]"
              />
              <CardTypeHome
                title="Comerciais"
                imageUrl="/tipos/comerciais.png"
                link="#"
              />
              <CardTypeHome
                title="Terrenos"
                imageUrl="/tipos/terrenos.png"
                link="#"
                className="md:mt-[20px]"
              />
              <CardTypeHome
                title="Chácaras"
                imageUrl="/tipos/chacaras.png"
                link="#"
              />
            </div>
          </div>
        </section>

        <article className="container !mt-10">
          <header className="text-center mb-[30px]">
            <h2
              className="text-gold text-[30px] md:text-[38px] font-montserrat tracking-[-0.95px] font-normal leading-[35px] md:leading-[47px] mb-[5px]"
            >
              As novidades mais recentes <strong className="font-semibold">estão aqui!</strong>
            </h2>

            <h4
              className="text-[19px] md:text-[22px] font-semibold leading-[22px] md:leading-[27px] font-montserrat"
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
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}
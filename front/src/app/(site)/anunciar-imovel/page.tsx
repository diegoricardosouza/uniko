import { Breadcrumb } from "@/components/Breadcrumb";
import { CardAnuncie } from "@/components/CardAnuncie";
import { FeaturedTypes } from "@/components/FeaturedTypes";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Administracao } from "@/components/icons/Administracao";
import { AnuncioGratuito } from "@/components/icons/AnuncioGratuito";
import { AssessoriaJuridica } from "@/components/icons/AssessoriaJuridica";
import { ConsultorImobiliario } from "@/components/icons/ConsultorImobiliario";
import { Digital } from "@/components/icons/Digital";
import { FotografiaImobiliaria } from "@/components/icons/FotografiaImobiliaria";
import { MultiplosCanais } from "@/components/icons/MultiplosCanais";
import { Metadata } from "next";
import { Suspense } from "react";
import { FormAnunciar } from "./_components/FormAnunciar";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Anuciar Imóvel - Úniko Imóveis",
  description: "Úniko Imóveis - Melhores imóveis no Brasil",
};

export default async function AnunciarImovel() {
  return (
    <div>
      <Header />

      <main>
        <Breadcrumb title="ANUNCIAR IMÓVEL" />

        <div className="container !mt-[20px]">
          <header className="text-center mb-[94px]">
            <h2
              className="text-gold text-[30px] md:text-[36px] font-montserrat font-light leading-[35px] md:leading-[47px]"
            >
              Na <strong className="font-medium">Úniko</strong> seu imóvel é diferenciado!
            </h2>

            <h4
              className="text-[19px] md:text-[22px] font-medium text-title leading-[22px] md:leading-[27px] font-montserrat"
            >
              Conheças as vantagens de anunciar seu imóvel na Úniko
            </h4>
          </header>

          <div className="flex flex-wrap gap-[80px] md:gap-3">
            <CardAnuncie 
              icon={<AnuncioGratuito />}
              title="Anúncio Gratuito"
              content="Você não paga nada para anunciar! Publicaremos em nosso site gratuitamente."
            />
            <CardAnuncie 
              icon={<MultiplosCanais />}
              title="Múltiplos Canais"
              content="Seu imóvel também será anunciado nos maiores portais do Brasil."
            />
            <CardAnuncie 
              icon={<FotografiaImobiliaria />}
              title="Fotografia Imobiliária"
              content="Seu imóvel é fotografado pela nossa equipe para ter destaque nos portais."
            />
            <CardAnuncie 
              icon={<ConsultorImobiliario />}
              title="Consultor Imobiliário"
              content="Consultores e gerentes experientes vão te auxiliar a fazer o melhor negócio."
            />
          </div>

          <div className="flex flex-wrap gap-[80px] md:gap-3 justify-center mt-[80px] md:mt-[94px]">
            <CardAnuncie
              icon={<Digital />}
              title="100% Digital"
              content="Não precisa ir à imobiliária para resolver papelada: você faz tudo online."
            />
            <CardAnuncie
              icon={<Administracao />}
              title="Administração"
              content="Pode relaxar! Cuidamos do seu imóvel até o fim do contrato de aluguel."
            />
            <CardAnuncie
              icon={<AssessoriaJuridica />}
              title="Assessoria Jurídica"
              content="Proporcionamos a segurança necessária nas transações imobiliárias."
            />
          </div>
        </div>

        <article className="bg-bggray py-[50px] mt-10">
          <div className="container">
            <header className="text-center mb-[30px]">
              <h2
                className="text-gold text-[30px] md:text-[36px] font-montserrat font-light leading-[35px] md:leading-[47px]"
              >
                Quero anunciar meu imóvel na <strong className="font-medium">Úniko!</strong>
              </h2>

              <h4
                className="text-[19px] md:text-[22px] font-medium text-title leading-[22px] md:leading-[27px] font-montserrat"
              >
                Anuncie seu imóvel conosco e tenha maior destaque na região.
              </h4>
            </header>

            <Suspense fallback={<div className="text-center">Carregando formulário...</div>}>
              <FormAnunciar />
            </Suspense>
          </div>
        </article>

        <div className="container !mt-[50px] !mb-10">
          <FeaturedTypes />
        </div>
      </main>

      <Footer />
    </div>
  )
}
import { Breadcrumb } from "@/components/Breadcrumb";
import { CardAnuncie } from "@/components/CardAnuncie";
import { FeaturedTypes } from "@/components/FeaturedTypes";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AgendamentoVisitas } from "@/components/icons/AgendamentoVisitas";
import { BuscaAvancada } from "@/components/icons/BuscaAvancada";
import { ContatoCorretor } from "@/components/icons/ContatoCorretor";
import { ContratacaoImovel } from "@/components/icons/ContratacaoImovel";
import { PreenchaFormulario } from "@/components/icons/PreenchaFormulario";
import { Metadata } from "next";
import { Suspense } from "react";
import { FormProcurar } from "./_components/FormProcurar";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Procurar Imóvel - Úniko Imóveis",
  description: "Úniko Imóveis - Melhores imóveis no Brasil",
};

export default async function AnunciarImovel() {
  return (
    <div>
      <Header />

      <main>
        <Breadcrumb title="PROCURAR IMÓVEL" />

        <div className="container !mt-[20px]">
          <header className="text-center mb-[94px]">
            <h2
              className="text-gold text-[30px] md:text-[36px] font-montserrat font-light leading-[35px] md:leading-[47px]"
            >
              O imóvel dos seus sonhos <strong className="font-medium">mais perto de você</strong>
            </h2>

            <h4
              className="text-[19px] md:text-[22px] font-medium text-title leading-[22px] md:leading-[27px] font-montserrat"
            >
              Veja como é fácil buscar o seu futuro imóvel com a Úniko
            </h4>
          </header>

          <div className="flex flex-wrap gap-[80px] md:gap-[30px]">
            <CardAnuncie 
              icon={<PreenchaFormulario />}
              title="Preencha o Formulário"
              content="Um de nossos consultores entrará em contato para entender as suas necessidades. Talvez ele já tenha algumas dicas."
              classname="md:max-w-[380px]"
            />
            <CardAnuncie 
              icon={<ContatoCorretor />}
              title="Contato com Corretor"
              content="Após enviar os dados do imóvel ideal para você, um de nossos especialistas na área entrará em contato com você para mais detalhes."
              classname="md:max-w-[380px]"
            />
            <CardAnuncie 
              icon={<BuscaAvancada />}
              title="Busca Avançada do imóvel"
              content="Nesta etapa nossos corretores irão efetuar uma busca minuciosa no mercado em busca do imóvel perfeito para você."
              classname="md:max-w-[380px]"
            />
          </div>

          <div className="flex flex-wrap gap-[80px] md:gap-[30px] justify-center mt-[80px] md:mt-[94px]">
            <CardAnuncie
              icon={<AgendamentoVisitas />}
              title="Agendamento das Visitas"
              content="Após encontrarmos alguns imóveis que seja no seu perfil, iremos fazer as visitas conforme agendamento e ordem de preferência."
              classname="md:max-w-[380px]"
            />
            <CardAnuncie
              icon={<ContratacaoImovel />}
              title="Contratação do imóvel"
              content="Achando o imóvel perfeito, chegou o grande momento que você tanto sonhava. Aquisição do imóvel dos sonhos."
              classname="md:max-w-[380px]"
            />
          </div>
        </div>

        <article className="bg-bggray py-[50px] mt-10">
          <div className="container">
            <header className="text-center mb-[30px]">
              <h2
                className="text-gold text-[30px] md:text-[38px] font-montserrat font-light leading-[35px] md:leading-[47px]"
              >
                Quero encontrar um imóvel <strong className="font-medium">Úniko</strong>
              </h2>

              <h4
                className="text-[19px] md:text-[22px] font-medium text-title leading-[22px] md:leading-[27px] font-montserrat"
              >
                Nos conte os detalhes do imóvel dos seus sonhos
              </h4>
            </header>
            
            <Suspense fallback={<div className="text-center">Carregando formulário...</div>}>
              <FormProcurar />
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
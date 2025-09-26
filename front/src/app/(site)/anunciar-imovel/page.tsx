import { Breadcrumb } from "@/components/Breadcrumb";
import { CardAnuncie } from "@/components/CardAnuncie";
import { CardType } from "@/components/CardType";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Administracao } from "@/components/icons/Administracao";
import { AnuncioGratuito } from "@/components/icons/AnuncioGratuito";
import { AssessoriaJuridica } from "@/components/icons/AssessoriaJuridica";
import { ConsultorImobiliario } from "@/components/icons/ConsultorImobiliario";
import { Digital } from "@/components/icons/Digital";
import { FotografiaImobiliaria } from "@/components/icons/FotografiaImobiliaria";
import { MultiplosCanais } from "@/components/icons/MultiplosCanais";
import { FormAnunciar } from "./_components/FormAnunciar";

export default async function AnunciarImovel() {
  return (
    <div>
      <Header />

      <main>
        <Breadcrumb title="ANUNCIAR IMÓVEL" />

        <div className="container !mt-[20px]">
          <header className="text-center mb-[94px]">
            <h2
              className="text-gold text-[30px] md:text-[38px] font-montserrat tracking-[-0.95px] font-normal leading-[35px] md:leading-[47px] mb-[5px]"
            >
              Na <strong className="font-semibold">Úniko</strong> seu imóvel é diferenciado!
            </h2>

            <h4
              className="text-[19px] md:text-[22px] font-semibold text-title leading-[22px] md:leading-[27px] font-montserrat"
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
                className="text-gold text-[30px] md:text-[38px] font-montserrat tracking-[-0.95px] font-normal leading-[35px] md:leading-[47px] mb-[5px]"
              >
                Quero anunciar meu imóvel na <strong className="font-semibold">Úniko!</strong>
              </h2>

              <h4
                className="text-[19px] md:text-[22px] font-semibold text-title leading-[22px] md:leading-[27px] font-montserrat"
              >
                Anuncie seu imóvel conosco e tenha maior destaque na região.
              </h4>
            </header>

            <FormAnunciar />
          </div>
        </article>

        <div className="container !mt-[50px] !mb-10">
          <header className="text-center mb-[30px]">
            <h2
              className="text-gold text-[30px] md:text-[38px] font-montserrat tracking-[-0.95px] font-normal leading-[35px] md:leading-[47px] mb-[5px]"
            >
              Cada imóvel tem seu jeito <strong className="font-semibold">Úniko</strong> e você tem o seu!
            </h2>

            <h4
              className="text-[19px] md:text-[22px] font-semibold text-title leading-[22px] md:leading-[27px] font-montserrat"
            >
              O imóvel dos seus sonhos a um clique de distância. O que você procura hoje?
            </h4>
          </header>

          <div className="flex flex-col md:flex-row gap-[15px] md:gap-[30px]">
            <CardType
              title="<strong>LANÇAMENTOS</strong>"
              content="Imóveis Únikos que serão lançados em breve"
              image="/img-lancamentos.png"
              width={380}
              height={310}
              link="#"
              position="Cima Esquerda"
            />

            <CardType
              title="QUERO <strong>COMPRAR</strong>"
              content="Uma seleção de imóveis que vão te surpreender"
              image="/img-comprar.png"
              width={380}
              height={310}
              link="#"
              position="Baixo Direita"
            />

            <CardType
              title="QUERO <strong>ALUGAR</strong>"
              content="A locação mais rápida do mercado é na Úniko"
              image="/img-alugar.png"
              width={380}
              height={310}
              link="#"
              position="Cima Direita"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
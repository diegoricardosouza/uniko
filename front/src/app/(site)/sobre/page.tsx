import { Breadcrumb } from "@/components/Breadcrumb";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Metadata } from "next";
import { FaWhatsapp } from "react-icons/fa6";
import { LuArrowRight } from "react-icons/lu";
import { BHCarousel } from "./_components/BHCarousel";
import { CuritibaCarousel } from "./_components/CuritibaCarousel";
import { EspacoCarousel } from "./_components/EspacoCarousel";



export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Sobre - Úniko Imóveis",
  description: "Úniko Imóveis - Cada imóvel tem seu jeito ÚNIKO e você tem o seu!",
};

export default function Sobre() {
  

  return (
    <div>
      <Header />
      
      <main>
        <Breadcrumb title="SOBRE A ÚNIKO" />
        
        <div className="container !mt-[20px]">
          <header className="text-center mb-[30px]">
            <h2
              className="text-gold text-[30px] md:text-[36px] font-montserrat font-light leading-[35px] md:leading-[47px]"
            >
              Espaço Úniko
            </h2>

            <h4
              className="text-[19px] md:text-[22px] font-medium text-title leading-[22px] md:leading-[29px] font-montserrat"
            >
              Um espaço pensado para quem realmente importa: você cliente único e parceiros
            </h4>
          </header>

          <div className="md:grid grid-cols-2">
            <div className="md:pr-[30px] mb-[20px] md:mb-0">
              <EspacoCarousel />
            </div>

            <div className="content">
              <p>Na Úniko Imóveis, acreditamos que o cliente não é só parte do processo ele é o centro de tudo. Por isso, criamos um espaço exclusivo, acolhedor e sofisticado, onde cada encontro se transforma em uma experiência única.</p>
              <p>Mais do que uma sala, nosso espaço cliente é um diferencial no mercado imobiliário: um ambiente preparado para conversas estratégicas, troca de conhecimento e fechamento de grandes negócios, sempre com conforto, privacidade e atenção aos detalhes.</p>
              <p>Porque para nós, cada cliente é especial. Cada história importa. E acima de tudo… cada cliente é Úniko.</p>
            </div>
          </div>

          <header className="text-center mb-[30px] mt-[60px]">
            <h2
              className="text-gold text-[30px] md:text-[36px] font-montserrat font-light leading-[35px] md:leading-[47px]"
            >
              Na <strong className="font-medium">Úniko</strong> seu imóvel é diferenciado!
            </h2>

            <h4
              className="text-[19px] md:text-[22px] font-medium text-title leading-[22px] md:leading-[29px] font-montserrat"
            >
              Conheças as vantagens de anunciar seu imóvel na Úniko
            </h4>
          </header>

          <div className="md:grid grid-cols-2">
            <div className="content">
              <p>Criada para atender seus clientes e parceiros de forma diferenciada e personalizada em um ambiente profissional, a Úniko Negócios Imobiliários está situada no centro econômico de Curitiba, onde grandes empresas estão localizadas.</p> 
              <p>A empresa possui uma equipe especializada em terrenos para incorporadoras, imóveis de médio e alto padrão e prédios corporativos.</p>

              <div className="flex justify-center md:justify-end">
                <a href={`https://wa.me/5541996615511`} target="_blank" className="button-geral !bg-black hover:!bg-gold !text-white">
                  <FaWhatsapp className="w-[15px] h-[15px] lg:w-[18px] lg:h-[18px]" />
                  CURITIBA
                  <LuArrowRight className="w-[15px] h-[15px] lg:w-[18px] lg:h-[18px] ml-[-3px]" />
                </a>
              </div>
            </div>

            <div className="md:pl-[30px] mt-[20px] md:mt-0">
              <CuritibaCarousel />
            </div>
          </div>

          <div className="mt-10">
            <header className="text-center mb-[30px]">
              <h2
                className="text-gold text-[30px] md:text-[36px] font-montserrat font-light leading-[35px] md:leading-[47px]"
              >
                Nossa filial em <strong className="font-medium">Belo Horizonte</strong>
              </h2>

              <h4
                className="text-[19px] md:text-[22px] font-medium text-title leading-[22px] md:leading-[29px] font-montserrat"
              >
                BH conta com o perfil inovador e diferenciado de nossos especialistas no mercado imobiliário
              </h4>
            </header>

            <div className="md:grid grid-cols-2">
              <div className="md:pr-[30px] mb-[20px] md:mb-0">
                <BHCarousel />
              </div>

              <div className="content">
                <p>Nosso objetivo é levar cada vez mais facilidade nos processos imobiliários, e com esse time de corretores que possuímos, você nosso cliente e amigo irá realizar o sonho do seu imóvel o quanto antes.</p>
                <p>Nossa unidade abriga uma talentosa equipe de profissionais especialistas em interpretar de maneira clara e objetiva o que o cliente deseja, através de um atendimento diferenciado, baseado na exclusividade da linguagem e valores compartilhados com esse consumidor tão especial.</p>
                <p>Essa equipe de excelência entrega soluções criativas e eficientes, tanto para a venda como para locação, garantindo a melhor experiência em negócios imobiliários. Como em todas as sedes da Úniko, você terá à sua disposição as melhores opções de financiamento para o seu imóvel, através de um consultor especialista sediado nesta unidade.</p>

                <div className="flex justify-center md:justify-start">
                  <a href={`https://wa.me/5531999868706`} target="_blank" className="button-geral !bg-black hover:!bg-gold !text-white">
                    <FaWhatsapp className="w-[15px] h-[15px] lg:w-[18px] lg:h-[18px]" />
                    FILIAL BELO HORIZONTE
                    <LuArrowRight className="w-[15px] h-[15px] lg:w-[18px] lg:h-[18px] ml-[-3px]" />
                  </a>
                </div>
              </div>
            </div>

            <hr className="border-0 mt-[30px] mb-[68px] w-full h-[2px] bg-gold" />

            <div className="flex flex-col md:grid grid-cols-3 gap-[50px] md:gap-[30px] mb-10">
              <article className="box-sobre-missao">
                <div className="title">
                  Missão
                </div>

                <p>Oferecer aos nossos clientes as melhores oportunidades do setor imobiliário, contando com uma equipe de profissionais capacitada e que preza pelos princípios da ética, seriedade e respeito. Asseguramos aos clientes e parceiros a concretização dos melhores negócios nas áreas de incorporação, imóveis corporativos, residenciais e lançamentos.</p>
              </article>

              <article className="box-sobre-missao">
                <div className="title">
                  Visão
                </div>

                <p>Ser sempre referência imobiliária em imóveis de qualidade como empresa inovadora, que antecipa tendências, atrai e desenvolve os melhores profissionais, e ser reconhecida como um centro de excelência em negócios nas transações imobiliárias em âmbito nacional.</p>
              </article>
              
              <article className="box-sobre-missao">
                <div className="title">
                  Valores
                </div>

                <p>Ser sustentável mediante o comportamento ético irrepreensível, em todas as ações, qualidade máxima nos serviços, inovação como marca registrada e comprometimento com as melhores causas do setor e do país.</p>
              </article>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
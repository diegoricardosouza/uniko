import { getPageSlugAction } from "@/app/actions/pages/get-page-slug";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CardType } from "@/components/CardType";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Financiamento - Úniko Imóveis",
  description: "Úniko Imóveis - Cada imóvel tem seu jeito ÚNIKO e você tem o seu!",
};

export default async function Financiamento() {
  const page = await getPageSlugAction('financiamento');

  return (
    <div>
      <Header />

      <main>
        <Breadcrumb title="FINANCIAMENTO" />

        <div className="container !mt-[20px]">
          <header className="text-center mb-[30px]">
            <h2
              className="text-gold text-[30px] md:text-[36px] font-montserrat font-light leading-[35px] md:leading-[47px]"
            >
              O caminho para a conquista da <strong className="font-medium">casa própria!</strong>
            </h2>

            <h4
              className="text-[19px] md:text-[22px] font-medium text-title leading-[22px] md:leading-[29px] font-montserrat"
            >
              Conheças as vantagens de anunciar seu imóvel na Úniko
            </h4>
          </header>

          <div className="md:flex gap-[30px]">
            <div className="flex-1 content"
              dangerouslySetInnerHTML={{ __html: page.content ?? "" }}
            />

            <aside className="w-full max-w-[380px] flex flex-col gap-5">
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
            </aside>
          </div>
        </div>

        <div className="bg-bggray py-10 mt-10 md:mt-0">
          <div className="container">
            <header className="text-center mb-[30px]">
              <h2
                className="text-gold text-[30px] md:text-[36px] font-montserrat font-light leading-[35px] md:leading-[47px]"
              >
                Faça uma <strong className="font-medium">simulação online</strong>
              </h2>

              <h4
                className="text-[19px] md:text-[22px] font-medium text-title leading-[22px] md:leading-[29px] font-montserrat"
              >
                Simule o financiamento do seu novo imóvel, 100% digital
              </h4>
            </header>

            <div className="grid grid-cols-7">
              <a href="https://www8.caixa.gov.br/siopiinternet-web/simulaOperacaoInternet.do?method=inicializarCasoUso" className="flex justify-center" target="_blank">
                <Image
                  src="/bancos/caixa.png"
                  width={128}
                  height={128}
                  alt="Caixa Econômica"
                  title="Caixa Econômica"
                />
              </a>

              <a href="https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/imoveis/credito-imobiliario-aquisicao-de-imoveis.shtm" className="flex justify-center" target="_blank">
                <Image
                  src="/bancos/bradesco.png"
                  width={128}
                  height={128}
                  alt="Bradesco"
                  title="Bradesco"
                />
              </a>

              <a href="https://www.negociosimobiliarios.santander.com.br/negociosimobiliarios/#/dados-pessoais?IC=jornada-credito-imobiliario" className="flex justify-center" target="_blank">
                <Image
                  src="/bancos/santander.png"
                  width={128}
                  height={128}
                  alt="Santander"
                  title="Santander"
                />
              </a>

              <a href="https://www.bb.com.br/site/pra-voce/financiamentos/financiamento-imobiliario/#/" className="flex justify-center" target="_blank">
                <Image
                  src="/bancos/banco-brasil.png"
                  width={128}
                  height={128}
                  alt="Banco do Brasil"
                  title="Banco do Brasil"
                />
              </a>

              <a href="https://www.itau.com.br/emprestimos-financiamentos/credito-imobiliario/simulador/" className="flex justify-center" target="_blank">
                <Image
                  src="/bancos/itau.png"
                  width={128}
                  height={128}
                  alt="Itaú"
                  title="Itaú"
                />
              </a>

              <a href="https://www.banrisul.com.br/bob/link/bobw02hn_conteudo_lista.aspx?secao_id=1069#" className="flex justify-center" target="_blank">
                <Image
                  src="/bancos/banrisul.png"
                  width={128}
                  height={128}
                  alt="Banrisul"
                  title="Banrisul"
                />
              </a>

              <a href="https://www.sicredi.com.br/site/credito/para-voce/credito-imobiliario/" className="flex justify-center" target="_blank">
                <Image
                  src="/bancos/sicred.png"
                  width={128}
                  height={128}
                  alt="Sicred"
                  title="Sicred"
                />
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
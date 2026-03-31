import { Breadcrumb } from "@/components/Breadcrumb";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Metadata } from "next";
import { Suspense } from "react";
import { FormAviso } from "./_component/FormAviso";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Contestação de Vistorias - Úniko Imóveis",
  description: "Úniko Imóveis - Cada imóvel tem seu jeito ÚNIKO e você tem o seu!",
};

export default async function Contestacao() {
  return (
    <div>
      <Header />

      <main>
        <Breadcrumb title="AVISO DE DESOCUPAÇÃO" />
        <div className="container !mt-[20px]">
          <header className="text-center mb-[30px]">
            <h2
              className="text-gold text-[30px] md:text-[36px] font-montserrat font-light leading-[35px] md:leading-[47px]"
            >
              Aviso de <strong className="font-medium">Desocupação</strong>
            </h2>

            <h4
              className="text-[19px] md:text-[22px] font-medium text-title leading-[22px] md:leading-[27px] font-montserrat"
            >
              Conheça os detalhes para receber o reembolso
            </h4>
          </header>

          <div className="flex flex-col md:flex-row gap-[30px] items-center">
            <div className="w-full max-w-[380px] bg-bggray rounded-[20px_20px_20px_0px] px-5 py-10">
              <h4 className="text-gold font-montserrat text-[22px] md:text-[25px] leading-[28px] md:leading-[30px] tracking-[-0.63px] text-center">
                O aluguel e encargos serão devidos <strong>até a data da entrega das chaves</strong>, após ter sido verificado a regularidade do imóvel e ter sido efetuado os reparos solicitados.
              </h4>
            </div>

            <div className="content flex-1">
              <p>Prezado (a) Inquilino (a), aqui você poderá anexar o boleto de condomínio e o comprovante de pagamento. Lembre-se que os dois arquivos devem ser enviados.</p>
              <p><strong>Prazo:</strong> Dentro dos 30 dias você deverá se programar para desocupação da unidade e ligar em até 05 (cinco) dias úteis antes a entrega das chaves para que possamos agendar previamente junto a empresa terceirizada dia e hora da vistoria de saída.</p>
            </div>
          </div>
        </div>

        <article className="bg-bggray py-10 mt-10">
          <div className="container">
            <Suspense fallback={<div className="text-center">Carregando formulário...</div>}>
              <FormAviso />
            </Suspense>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
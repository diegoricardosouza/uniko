import { Breadcrumb } from "@/components/Breadcrumb";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Metadata } from "next";
import { FormFundoReservas } from "./_component/FormFundoReservas";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Fundo de Reservas - Úniko Imóveis",
  description: "Úniko Imóveis - Melhores imóveis no Brasil",
};

export default async function Contestacao() {
  return (
    <div>
      <Header />

      <main>
        <Breadcrumb title="FUNDO DE RESERVAS" />
        <div className="container !mt-[20px]">
          <header className="text-center mb-[30px]">
            <h2
              className="text-gold text-[30px] md:text-[36px] font-montserrat font-light leading-[35px] md:leading-[47px]"
            >
              Fundo de Reservas e <strong className="font-medium">Taxas</strong>
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
                O fundo de reserva do condomínio está previsto por lei na Lei nº 4.591/1964, no Art.9°, §3°, alínea “j”.
              </h4>
            </div>

            <div className="content flex-1">
              <p>Prezado (a) Inquilino (a), aqui você poderá anexar o boleto de condomínio e o comprovante de pagamento. Lembre-se que os dois arquivos devem ser enviados.</p>
              <p>Até o dia <strong>18 de cada mês</strong> a ÚNIKO lançará os descontos que são do seu direito. Após essa data os valores serão lançados no próximo mês.</p>
            </div>
          </div>
        </div>

        <article className="bg-bggray py-10 mt-10">
          <div className="container">
            <FormFundoReservas />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
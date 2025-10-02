import { Breadcrumb } from "@/components/Breadcrumb";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Metadata } from "next";
import { FormContestacao } from "./_component/FormContestacao";

export const metadata: Metadata = {
  title: "Contestação de Vistorias - Úniko Imóveis",
  description: "Úniko Imóveis - Melhores imóveis no Brasil",
};

export default async function Contestacao() {
  return (
    <div>
      <Header />

      <main>
        <Breadcrumb title="CONTESTAÇÃO DE VISTORIAS" />
        <div className="container !mt-[20px]">
          <header className="text-center mb-[30px]">
            <h2
              className="text-gold text-[30px] md:text-[38px] font-montserrat tracking-[-0.95px] font-normal leading-[35px] md:leading-[47px] mb-[5px]"
            >
              Contestação de <strong className="font-semibold">Vistorias</strong>
            </h2>

            <h4
              className="text-[19px] md:text-[22px] font-semibold text-title leading-[22px] md:leading-[27px] font-montserrat"
            >
              Conheça os detalhes para contestar por escrito
            </h4>
          </header>

          <div className="flex flex-col md:flex-row gap-[30px] items-center">
            <div className="w-full max-w-[380px] bg-bggray rounded-[20px_20px_20px_0px] px-5 py-10">
              <h4 className="text-gold font-montserrat text-[22px] md:text-[25px] leading-[28px] md:leading-[30px] tracking-[-0.63px] text-center">
                Em caso de divergência, a contestação deverá ser apresentada, por escrito, <strong>no prazo máximo de 05 (cinco) dias</strong>, contados do recebimento das chaves.
              </h4>
            </div>

            <div className="content flex-1">
              <p><strong>Importante:</strong> O imóvel lhe está sendo entregue nas mesmas condições de apresentação e conservação que já verificou e inteirou-se quando das visitas para escolha do mesmo.</p>
              <p>Eventuais defeitos apontados na vistoria têm apenas o objetivo de registro para comparação futuras, principalmente quando da desocupação, não significando, portanto, que serão reparados pelo proprietário. </p>
              <p>O aceite e recebimento sem a contestação presume a veracidade da mesma.</p>
            </div>
          </div>
        </div>

        <article className="bg-bggray py-10 mt-10">
          <div className="container">
            <FormContestacao />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
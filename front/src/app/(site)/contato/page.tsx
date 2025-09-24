import { getSettingsAction } from "@/app/actions/settings/get-settings";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Footer } from "@/components/Footer";
import { GoogleMaps } from "@/components/GoogleMaps";
import { Header } from "@/components/Header";
import { Metadata } from "next";
import { FormContato } from "./_component/FormContato";

export const metadata: Metadata = {
  title: "Contato - Úniko Imóveis",
  description: "Úniko Imóveis - Melhores imóveis no Brasil",
};

export default async function Contato() {
  const settings = await getSettingsAction();

  return (
    <div>
      <Header />

      <main>
        <Breadcrumb title="CONTATO" />
        <div className="container !mt-[20px]">
          <header className="text-center mb-[30px]">
            <h2
              className="text-gold text-[30px] md:text-[38px] font-montserrat tracking-[-0.95px] font-normal leading-[35px] md:leading-[47px] mb-[5px]"
            >
              Atendimento Diferenciado e <strong className="font-semibold">Personalizado</strong>
            </h2>

            <h4
              className="text-[19px] md:text-[22px] font-semibold text-title leading-[22px] md:leading-[27px] font-montserrat"
            >
              Estamos aqui para lhe ajudar! Venha visitar uma de nossas lojas!
            </h4>
          </header>
        </div>

        {settings[0].unitCompany?.map((unit, index) => (
          <div className="container" key={unit.id}>
            <GoogleMaps

              address={unit.address ?? ""}
              businessName={unit.name}
              phone1={unit.telephone}
              phone2={unit.cellphone}
              hours={unit.service}
            />

            {index <= 0 && <hr className="border-0 w-full m-0 h-[2px] bg-gold my-5" />}
          </div>
        ))}

        <article className="bg-bggray py-10 mt-10">
          <div className="container">
            <header className="text-center mb-[30px]">
              <h2
                className="text-gold text-[30px] md:text-[38px] font-montserrat tracking-[-0.95px] font-normal leading-[35px] md:leading-[47px] mb-[5px]"
              >
                O que podemos <strong className="font-semibold">fazer por você?</strong>
              </h2>

              <h4
                className="text-[19px] md:text-[22px] font-semibold text-title leading-[22px] md:leading-[27px] font-montserrat"
              >
                Em breve um de nosso corretores especializados entrará em contato com você!
              </h4>
            </header>

            <FormContato />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
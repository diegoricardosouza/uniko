import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

export function DifferentiatedService() {
  return (
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
  )
}
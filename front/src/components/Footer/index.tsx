import { getSettingsAction } from "@/app/actions/settings/get-settings";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { LuArrowRight } from "react-icons/lu";
import { WhatsApp } from "../WhatsApp";

export async function Footer() {
  const settings = await getSettingsAction();
  
  return (
    <footer>
      <WhatsApp settings={settings[0]} />
      
      <div className="bg-gold py-8">
        <div className="container flex flex-col md:flex-row justify-center gap-[30px] lg:gap-[280px]">
          {settings[0].unitCompany?.map((unit) => {
            const whats = unit.cellphone?.replace(/\D/g, '')
            const names = unit.name?.replace(/^(Matriz|Filial)\s+/, '').replace(/<\/?strong>/g, '')
            
            return (
              <article key={unit.id} className="w-full md:max-w-[50%] lg:max-w-[355px] text-center">
              <header>
                <h2 
                  className="footer-title_units"
                  dangerouslySetInnerHTML={{ __html: unit.name ?? "" }}
                />
              </header>

              <address 
                className="font-montserrat text-[18px] text-white font-light leading-[22px] mb-1"
                dangerouslySetInnerHTML={{ __html: unit.address ?? "" }}
              />

              <p className="text-white font-semibold text-[20px] leading-[24px] font-montserrat mb-3.5">
                {unit.telephone} | {unit.cellphone}
              </p>

              <a href={`https://wa.me/55${whats}`} target="_blank" className="button-geral">
                  <FaWhatsapp className="w-[15px] h-[15px] lg:w-[18px] lg:h-[18px]" />
                {names}
                <LuArrowRight className="w-[15px] h-[15px] lg:w-[18px] lg:h-[18px] ml-[-3px]" />
              </a>
            </article>
          )})}
        </div>
      </div>

      <div className="bg-black py-8">
        <div className="container flex flex-col gap-7 md:grid grid-cols-4 lg:gap-0">
          <div className="footer-links">
            <h4>Curitiba</h4>

            <ul>
              <li>
                <Link href="/imoveis?finalidade=comprar&city=curitiba">
                  Comprar
                </Link>
              </li>
              <li>
                <Link href="/imoveis?finalidade=alugar&city=curitiba">
                  Alugar
                </Link>
              </li>
              <li>
                <Link href="/imoveis?finalidade=lancamentos&city=curitiba">
                  Lançamentos
                </Link>
              </li>
              <li>
                <Link href="/anunciar-imovel?city=curitiba">
                  Anunciar Imóvel
                </Link>
              </li>
              <li>
                <Link href="/procurar-imovel?city=curitiba">
                  Procurar Imóvel
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Belo Horizonte</h4>

            <ul>
              <li>
                <Link href="imoveis?finalidade=comprar&city=belo-horizonte">
                  Comprar
                </Link>
              </li>
              <li>
                <Link href="imoveis?finalidade=alugar&city=belo-horizonte">
                  Alugar
                </Link>
              </li>
              <li>
                <Link href="imoveis?finalidade=lancamentos&city=belo-horizonte">
                  Lançamentos
                </Link>
              </li>
              <li>
                <Link href="/anunciar-imovel?city=belo-horizonte">
                  Anunciar Imóvel
                </Link>
              </li>
              <li>
                <Link href="/procurar-imovel?city=belo-horizonte">
                  Procurar Imóvel
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Blog</h4>

            <ul>
              <li>
                <Link href="/noticias">
                  Notícias
                </Link>
              </li>
              <li>
                <Link href="/videos">
                  Vídeos
                </Link>
              </li>
            </ul><br />

            <h4>Úniko</h4>

            <ul>
              <li>
                <Link href="/sobre">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/financiamento">
                  Financiamento
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <Link href="/contato">
              <h4>Contato</h4>
            </Link><br />

            <h4>Área do Cliente</h4>

            <ul className="mb-6">
              <li>
                <Link href="/fundo-de-reservas">
                  Fundo de Reservas
                </Link>
              </li>
              <li>
                <Link href="/aviso-de-desocupacao">
                  Aviso de Desocupação
                </Link>
              </li>
              <li>
                <Link href="/contestacao-de-vistorias">
                  Contestação de Vistorias
                </Link>
              </li>
            </ul>

            <div className="flex items-center gap-4">
              <Image
                src="/parana.png"
                width={43}
                height={30}
                alt="Paraná"
                title="Paraná"
                unoptimized
              />

              <Image
                src="/minas.png"
                width={46}
                height={30}
                alt="Minas Gerais"
                title="Minas Gerais"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <p 
          className="text-center font-inter text-[15px] font-normal text-black leading-[20px]"
        >
          ©2026 <strong className="font-semibold">Úniko Imóveis LTDA | CNPJ</strong> 13.714.854/0001-81 | <strong className="font-semibold">Uniko PR</strong> - CRECI J4652 | <strong className="font-semibold">Uniko BH</strong> - CRECI J0006135 | Desenvolvido por <a href="https://dev2.com.br/" className="font-semibold transition-all hover:text-gold" target="_blank">Dev2 - Comunicação Integrada</a>
        </p>
      </div>
    </footer>
  )
}
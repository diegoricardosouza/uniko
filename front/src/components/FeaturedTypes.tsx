import { CardType } from "./CardType";

export function FeaturedTypes() {
  return (
    <div>
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
  )
}
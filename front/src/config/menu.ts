export interface MenuItem {
  href: string;
  label: string;
  submenu?: MenuItem[];
}

export const menuLeft = [
  {
    href: "/home",
    label: "Home"
  },
  {
    href: "#",
    label: "Curitiba",
    submenu: [
      {
        href: "/imoveis?tipo=comprar",
        label: "Comprar"
      },
      {
        href: "/imoveis?tipo=alugar",
        label: "Alugar"
      },
      {
        href: "/imoveis?tipo=lancamentos",
        label: "Lançamentos"
      },
      {
        href: "/anunciar-imovel?city=curitiba",
        label: "Anunciar Imóvel"
      },
      {
        href: "/procurar-imovel?city=curitiba",
        label: "Procurar Imóvel"
      },
    ]
  },
  {
    href: "#",
    label: "Belo Horizonte",
    submenu: [
      {
        href: "/imoveis?tipo=comprar",
        label: "Comprar"
      },
      {
        href: "/imoveis?tipo=alugar",
        label: "Alugar"
      },
      {
        href: "/imoveis?tipo=lancamentos",
        label: "Lançamentos"
      },
      {
        href: "/anunciar-imovel?city=belo-horizonte",
        label: "Anunciar Imóvel"
      },
      {
        href: "/procurar-imovel?city=belo-horizonte",
        label: "Procurar Imóvel"
      },
    ]
  },
]

export const menuRight = [
  {
    href: "#",
    label: "Blog",
    submenu: [
      {
        href: "/noticias",
        label: "Notícias"
      },
      {
        href: "/videos",
        label: "Vídeos"
      },
    ]
  },
  {
    href: "#",
    label: "Úniko",
    submenu: [
      {
        href: "/sobre",
        label: "Sobre"
      },
      {
        href: "/financiamento",
        label: "Financiamento"
      },
    ]
  },
  {
    href: "/contato",
    label: "Contato"
  },
]

export const menuHome = [
  {
    href: "/",
    label: "Úniko",
    submenu: [
      {
        href: "/sobre",
        label: "Sobre"
      },
      {
        href: "/financiamento",
        label: "Financiamento"
      },
    ]
  },
  {
    href: "/contato",
    label: "Contato"
  },
]

export const menuMobile = [
  {
    href: "/home",
    label: "Home"
  },
  {
    href: "#",
    label: "Curitiba",
    submenu: [
      {
        href: "/imoveis?tipo=comprar",
        label: "Comprar"
      },
      {
        href: "/imoveis?tipo=alugar",
        label: "Alugar"
      },
      {
        href: "/imoveis?tipo=lancamentos",
        label: "Lançamentos"
      },
      {
        href: "/anunciar-imovel?city=curitiba",
        label: "Anunciar Imóvel"
      },
      {
        href: "/procurar-imovel?city=curitiba",
        label: "Procurar Imóvel"
      },
    ]
  },
  {
    href: "#",
    label: "Belo Horizonte",
    submenu: [
      {
        href: "/imoveis?tipo=comprar",
        label: "Comprar"
      },
      {
        href: "/imoveis?tipo=alugar",
        label: "Alugar"
      },
      {
        href: "/imoveis?tipo=lancamentos",
        label: "Lançamentos"
      },
      {
        href: "/anunciar-imovel?city=belo-horizonte",
        label: "Anunciar Imóvel"
      },
      {
        href: "/procurar-imovel?city=belo-horizonte",
        label: "Procurar Imóvel"
      },
    ]
  },
  {
    href: "#",
    label: "Blog",
    submenu: [
      {
        href: "/noticias",
        label: "Notícias"
      },
      {
        href: "/videos",
        label: "Vídeos"
      },
    ]
  },
  {
    href: "#",
    label: "Úniko",
    submenu: [
      {
        href: "/sobre",
        label: "Sobre"
      },
      {
        href: "/financiamento",
        label: "Financiamento"
      },
    ]
  },
  {
    href: "/contato",
    label: "Contato"
  },
]
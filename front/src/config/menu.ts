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
        href: "/imoveis?finalidade=comprar&city=curitiba",
        label: "Comprar"
      },
      {
        href: "/imoveis?finalidade=alugar&city=curitiba",
        label: "Alugar"
      },
      {
        href: "/imoveis?finalidade=lancamentos&city=curitiba",
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
        href: "/imoveis?finalidade=comprar&city=belo-horizonte",
        label: "Comprar"
      },
      {
        href: "/imoveis?finalidade=alugar&city=belo-horizonte",
        label: "Alugar"
      },
      {
        href: "/imoveis?finalidade=lancamentos&city=belo-horizonte",
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
        href: "/imoveis?finalidade=comprar&city=curitiba",
        label: "Comprar"
      },
      {
        href: "/imoveis?finalidade=alugar&city=curitiba",
        label: "Alugar"
      },
      {
        href: "/imoveis?finalidade=lancamentos&city=curitiba",
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
        href: "/imoveis?finalidade=comprar&city=belo-horizonte",
        label: "Comprar"
      },
      {
        href: "/imoveis?finalidade=alugar&city=belo-horizonte",
        label: "Alugar"
      },
      {
        href: "/imoveis?finalidade=lancamentos&city=belo-horizonte",
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
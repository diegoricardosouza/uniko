export interface MenuItem {
  href: string;
  label: string;
  submenu?: MenuItem[];
}

export const menuLeft = [
  {
    href: "/",
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
        href: "/imoveis?tipo=lancamentos",
        label: "Anunciar Imóvel"
      },
      {
        href: "/imoveis?tipo=lancamentos",
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
        href: "/imoveis?tipo=lancamentos",
        label: "Anunciar Imóvel"
      },
      {
        href: "/imoveis?tipo=lancamentos",
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
    href: "/",
    label: "Home"
  },
  {
    href: "#",
    label: "Curitiba",
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
    label: "Belo Horizonte",
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
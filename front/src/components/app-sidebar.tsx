"use client"

import {
  Building,
  Home,
  Mails,
  Newspaper,
  NotebookText,
  Settings2,
  Users
} from "lucide-react"
import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Páginas",
      url: "#",
      icon: NotebookText,
      isActive: true,
      items: [
        {
          title: "Listar Todas",
          url: "/dashboard/pages",
        },
        {
          title: "Adicionar Nova",
          url: "/dashboard/pages/new",
        }
      ],
    },
    {
      title: "Imóveis",
      url: "#",
      icon: Building,
      items: [
        {
          title: "Listar Todos",
          url: "#",
        },
        {
          title: "Adicionar Novo",
          url: "#",
        },
        {
          title: "Finalidade",
          url: "/dashboard/properties/finalities",
        },
        {
          title: "Tipo",
          url: "/dashboard/properties/types",
        },
        {
          title: "Estados",
          url: "/dashboard/properties/states",
        },
        {
          title: "Cidades",
          url: "/dashboard/properties/cities",
        },
        {
          title: "Bairros",
          url: "/dashboard/properties/neighborhoods",
        },
      ],
    },
    {
      title: "Blog",
      url: "#",
      icon: Newspaper,
      items: [
        {
          title: "Listar Todos",
          url: "/dashboard/blog",
        },
        {
          title: "Adicionar Novo",
          url: "/dashboard/blog/new",
        },
        {
          title: "Categorias",
          url: "/dashboard/blog/category",
        }
      ],
    },
    {
      title: "Usuários",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Listar Todos",
          url: "/dashboard/users",
        },
        {
          title: "Adicionar Novo",
          url: "/dashboard/users/new",
        }
      ],
    },
    {
      title: "Emails",
      url: "/dashboard/emails",
      icon: Mails
    },
    {
      title: "Configurações",
      url: "/dashboard/settings",
      icon: Settings2,
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b">
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="border-t">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

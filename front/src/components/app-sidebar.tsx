"use client"

import {
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
import { useSession } from "next-auth/react"

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

const dataEditor = {
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
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = useSession();
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b">
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {session.data?.user.role === 'ADMIN' && (
          <NavMain items={data.navMain} />
        )}
        {session.data?.user.role === 'EDITOR' && (
          <NavMain items={dataEditor.navMain} />
        )}
      </SidebarContent>
      <SidebarFooter className="border-t">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

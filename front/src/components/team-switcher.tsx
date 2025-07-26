"use client"


import {
  DropdownMenu,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import Image from "next/image"
import logo from "../../public/icon-uniko.png"

export function TeamSwitcher() {
  const { open } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className={cn(
              "p-2 hover:bg-sidebar-accent rounded-md flex items-center gap-2",
              !open && 'p-0'
            )}>
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Image src={logo} alt="Logo Uniko" className="w-[20px]" priority />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Úniko Imóveis</span>
                <span className="truncate text-xs">Imobiliária</span>
              </div>
            </div>
            {/* <div className="p-2 hover:bg-sidebar-accent rounded-md">
              <Image src={logo} alt="Logo Uniko" className="w-[100px]" priority />
            </div> */}
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

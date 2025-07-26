'use client';

import { cn } from "@/lib/utils";
import { ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "./ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<string | null>(null)

  // Verifica o item ativo inicial baseado na URL
  useEffect(() => {
    const activeParent = items.find(item =>
      item.items &&
      item.items.some(subItem =>
        pathname === subItem.url ||
        pathname.startsWith(`${subItem.url}/`)
      )
    );
    setActiveItem(activeParent?.title || null);
  }, [items, pathname]);

  const handleToggle = (title: string) => {
    setActiveItem(prev => prev === title ? null : title);
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const isActiveParent = activeItem === item.title;
          const hasItems = item.items && item.items.length > 0;

          return (
            <React.Fragment key={item.title}>
              {hasItems ? (
                <Collapsible
                  asChild
                  open={isActiveParent}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        onClick={() => handleToggle(item.title)}
                        className={cn(
                          'cursor-pointer',
                          isActiveParent && "bg-sidebar-accent"
                        )}
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => {
                          const menuActive = String(subItem.url) === String(pathname)
                            || pathname.startsWith(`${subItem.url}/edit`) || pathname.startsWith(`${subItem.url}/detalhes`)

                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild isActive={menuActive}>
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title} onClick={() => handleToggle(item.title)}>
                  <SidebarMenuButton asChild isActive={isActiveParent} tooltip={item.title}>
                    <Link href={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </React.Fragment>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
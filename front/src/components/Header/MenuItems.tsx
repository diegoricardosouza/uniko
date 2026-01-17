/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { MenuItem } from "@/config/menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import Dropdown from "./Dropdown";

interface MenuItemsProps {
  items: MenuItem;
  depthLevel: number;
}

const MenuItems = ({ items, depthLevel }: MenuItemsProps) => {
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef<HTMLLIElement | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Função para verificar se uma URL completa corresponde à atual
  const isUrlActive = (href: string): boolean => {
    if (!href || href === "#") return false;

    try {
      // Parse da URL do menu
      if (href.startsWith("/")) {
        const [menuPath, menuQuery] = href.split("?");

        // Verifica se o pathname é igual
        if (menuPath !== pathname) return false;

        // Se não há query params na URL do menu, considera ativo apenas se o pathname coincidir
        if (!menuQuery) return menuPath === pathname;

        // Compara os query parameters
        const menuParams = new URLSearchParams(menuQuery);

        // Verifica se todos os parâmetros da URL do menu existem na URL atual
        for (const [key, value] of menuParams.entries()) {
          if (searchParams.get(key) !== value) return false;
        }

        return true;
      }

      // Fallback para URLs absolutas (caso existam)
      return href === pathname;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Fallback para comparação simples se a URL for inválida
      return href === pathname;
    }
  };

  // Função para verificar se algum item do submenu está ativo
  const hasActiveSubmenu = (submenu: MenuItem[]): boolean => {
    return submenu.some((item) => {
      if (isUrlActive(item.href)) return true;
      if (item.submenu) return hasActiveSubmenu(item.submenu);
      return false;
    });
  };

  // Função para verificar se este menu está relacionado à cidade atual
  const isCityMenuActive = (): boolean => {
    const currentCity = searchParams.get("city")?.toLowerCase();
    if (!currentCity) return false;

    // Mapeamento de cidades para labels do menu
    const cityLabels: { [key: string]: string } = {
      curitiba: "Curitiba",
      "belo-horizonte": "Belo Horizonte",
    };

    return cityLabels[currentCity] === items.label;
  };

  // Verifica se este menu ou algum submenu está ativo
  const isActive =
    isUrlActive(items.href) ||
    (items.submenu && hasActiveSubmenu(items.submenu)) ||
    isCityMenuActive();

  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      if (
        dropdown &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  const onMouseEnter = () => {
    setDropdown(true);
  };

  const onMouseLeave = () => {
    setDropdown(false);
  };

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  const closeDropdown = () => {
    dropdown && setDropdown(false);
  };

  return (
    <li
      className={cn(
        "menu-items",
        isActive && "menuActive",
        dropdown && "bg-[#C5AF62]",
      )}
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={closeDropdown}
    >
      {items.href && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => toggleDropdown()}
          >
            <Link href={items.href}>{items.label}</Link>
            {depthLevel > 0 ? (
              <MdKeyboardArrowDown size={21} />
            ) : (
              <MdKeyboardArrowDown size={23} />
            )}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : !items.href && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
          >
            {items.label}
            {depthLevel > 0 ? (
              <MdKeyboardArrowDown size={21} />
            ) : (
              <MdKeyboardArrowDown size={23} />
            )}
          </button>
          <Dropdown
            depthLevel={depthLevel}
            submenus={items.submenu}
            dropdown={dropdown}
          />
        </>
      ) : (
        <Link href={items.href} className="!flex justify-between">
          {items.label}
          {depthLevel > 0 && <MdKeyboardArrowRight size={23} />}
        </Link>
      )}
    </li>
  );
};

export default MenuItems;

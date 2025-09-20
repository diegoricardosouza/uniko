/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client'

import { MenuItem } from "@/config/menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

  // Função para verificar se algum item do submenu está ativo
  const hasActiveSubmenu = (submenu: MenuItem[]): boolean => {
    return submenu.some(item => {
      if (item.href === pathname) return true;
      if (item.submenu) return hasActiveSubmenu(item.submenu);
      return false;
    });
  };

  // Verifica se este menu ou algum submenu está ativo
  const isActive = pathname === items.href || (items.submenu && hasActiveSubmenu(items.submenu));

  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      if (dropdown && ref.current && !ref.current.contains(event.target as Node)) {
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
      className={
        cn(
          'menu-items',
          isActive && 'menuActive',
          dropdown && "bg-[#C5AF62]"
        )
      }
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={closeDropdown}>
      {items.href && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}
            onClick={() => toggleDropdown()}>
            <Link href={items.href}>{items.label}</Link>
            {depthLevel > 0 ? <MdKeyboardArrowDown size={21} /> : <MdKeyboardArrowDown size={23} />}
          </button>
          <Dropdown depthLevel={depthLevel} submenus={items.submenu} dropdown={dropdown} />
        </>
      ) : !items.href && items.submenu ? (
        <>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={dropdown ? "true" : "false"}>
            {items.label}
            {depthLevel > 0 ? <MdKeyboardArrowDown size={21} /> : <MdKeyboardArrowDown size={23} />}
          </button>
          <Dropdown depthLevel={depthLevel} submenus={items.submenu} dropdown={dropdown} />
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
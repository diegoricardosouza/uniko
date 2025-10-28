import { menuLeft, menuRight } from "@/config/menu";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { LuMenu } from "react-icons/lu";
import { Socials } from "../Socials";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../ui/sheet";
import MenuItems from "./MenuItems";
import { MenuMobile } from "./MenuMobile";

export function Header() {
  const depthLevel = 0;

  return (
    <header className="sticky top-0 flex items-center lg:block w-full bg-black z-[999]">
      <div className="container flex">
        <div className="hidden lg:flex items-center gap-3.5 flex-1">
          <nav className="desktop-nav">
            <ul className="menus">
              {menuLeft.map((menu, index) => {
                return (
                  <MenuItems key={index} items={menu} depthLevel={depthLevel} />
                )
              })}
            </ul>
          </nav>
        </div>

        <div className="flex justify-center my-[15px] lg:my-[25px] w-[190px]">
          <Link href="/">
            <Image
              src="/logo.png"
              width={180}
              height={60}
              alt="Logo Úniko"
              title="Logo Úniko"
            />
          </Link>
        </div>

        <div className="hidden lg:flex justify-end items-center gap-3.5 flex-1">
          <nav className="desktop-nav">
            <ul className="menus">
              {menuRight.map((menu, index) => {
                return (
                  <MenuItems key={index} items={menu} depthLevel={depthLevel} />
                )
              })}
            </ul>
          </nav>
          <div className="hidden lg:block">
            <Socials />
          </div>
        </div>
      </div>

      <div className="flex justify-end items-center h-full">
        <Sheet>
          <SheetTrigger asChild>
            <button className="shrink-0 lg:hidden mr-3">
              <LuMenu className="h-8 w-8 !text-white" />
              <span className="sr-only">Toggle navigation menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-white">
            <div className="hidden">
              <SheetTitle>Painel lateral sem título visível</SheetTitle>
              <SheetDescription>
                Ajuste suas preferências aqui.
              </SheetDescription>
            </div>
            <nav className="grid gap-6 text-base font-medium p-6">
              <Link href="/">
                <Image
                  src="/logo.png"
                  width={150}
                  height={50}
                  alt="Logo Úniko"
                  title="Logo Úniko"
                />
              </Link>
              <Suspense fallback={<div>Carregando menu...</div>}>
                <MenuMobile />
              </Suspense>
              <Socials />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
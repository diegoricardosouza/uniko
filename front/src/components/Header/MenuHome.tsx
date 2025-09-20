import { menuHome } from "@/config/menu";
import Image from "next/image";
import Link from "next/link";
import { LuMenu } from "react-icons/lu";
import { Socials } from "../Socials";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../ui/sheet";
import { MenuHomeMobile } from "./MenuHomeMobile";
import MenuItems from "./MenuItems";

export function MenuHome() {
  const depthLevel = 0;

  return (
    <div>
      <nav className="desktop-nav">
        <ul className="menus">
          {menuHome.map((menu, index) => {
            return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
          })}
        </ul>
      </nav>

      <div className="flex justify-end items-center h-full">
        <Sheet>
          <SheetTrigger asChild>
            <button
              className="shrink-0 lg:hidden"
            >
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

              <MenuHomeMobile />

              <Socials />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
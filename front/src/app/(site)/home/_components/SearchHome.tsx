"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { FormTab } from "./FormTab";
import { VideoBH } from "./VideoBH";
import { VideoCuritiba } from "./VideoCuritiba";

interface SearchHomeProps {
  city?: string;
}

export function SearchHome({ city }: SearchHomeProps) {

  return (
    <div className="relative h-[500px] md:h-[640px] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-black/45 flex items-center z-10">
        <div className="container flex flex-col md:flex-row">
          <div className="bg-black/90 p-[20px] md:py-[55px] md:px-[25px] md:rounded-[20px_0px_0px_20px]">
            <Image
              src="/logo.png"
              width={149}
              height={50}
              alt="Logo Úniko Imóveis"
              className="mx-auto"
              unoptimized
            />
          </div>

          <div className="bg-black/65 md:px-[25px] md:py-[30px] md:rounded-[0px_20px_20px_0px] flex-1">
            <Tabs defaultValue="comprar" className="gap-0">
              <TabsList className="search-tablist mb-[2px]">
                <TabsTrigger value="comprar" className="search-tab">
                  Comprar
                </TabsTrigger>
                <TabsTrigger value="alugar" className="search-tab">
                  Alugar
                </TabsTrigger>
                <TabsTrigger value="lancamentos" className="search-tab">
                  Lançamentos
                </TabsTrigger>
              </TabsList>
              <TabsContent value="comprar">
                <FormTab type="comprar" />
              </TabsContent>
              <TabsContent value="alugar">
                <FormTab type="alugar" />
              </TabsContent>
              <TabsContent value="lancamentos">
                <FormTab type="lancamentos" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {city === "belo-horizonte" ? <VideoBH /> : <VideoCuritiba />}
    </div>
  );
}

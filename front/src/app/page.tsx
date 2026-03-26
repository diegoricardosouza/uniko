import { MenuHome } from "@/components/Header/MenuHome";
import { Socials } from "@/components/Socials";
import { VideoHome } from "@/components/VideoHome";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { LuArrowRight } from "react-icons/lu";
import { getSettingsAction } from "./actions/settings/get-settings";

// Adicione esta linha para tornar a página dinâmica
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSettingsAction();

    if (!settings) {
      return {
        title: "Item não encontrado - Úniko Imóveis",
        description: "Úniko Imóveis - Melhores imóveis no Brasil",
      };
    }

    return {
      title: `Úniko Imóveis`,
      description:
        settings[0].descriptionSeo ||
        "Úniko Imóveis - Melhores imóveis no Brasil",
      openGraph: {
        title: settings[0].titleSeo,
        description: settings[0].descriptionSeo,
        images: "/logo.png",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: settings[0].titleSeo,
        description: settings[0].descriptionSeo,
        images: "/logo.png",
      },
    };
  } catch (error) {
    console.error("Erro ao gerar metadata:", error);

    return {
      title: "Erro - Úniko Imóveis",
      description: "Úniko Imóveis - Melhores imóveis no Brasil",
    };
  }
}

export default function Home() {
  return (
    <div>
      <div className="relative h-screen">
        <div className="absolute top-0 left-0 w-full h-full bg-black/45 flex flex-col z-10">
          <header className="w-full bg-black">
            <div className="container grid grid-cols-2 lg:grid-cols-3">
              <div className="hidden lg:block"></div>
              <div className="flex justify-center my-[15px] lg:my-[25px]">
                <Link href="/">
                  <Image
                    src="/logo.png"
                    width={180}
                    height={60}
                    alt="Logo Úniko"
                    title="Logo Úniko"
                    unoptimized
                  />
                </Link>
              </div>
              <div className="flex justify-end items-center gap-3.5">
                <Suspense fallback={<div className="w-10 h-10" />}>
                  <MenuHome />
                </Suspense>
                <div className="hidden lg:block">
                  <Socials />
                </div>
              </div>
            </div>
          </header>

          <div className="flex flex-col items-center justify-center h-full flex-1">
            <h1 className="text-white text-[40px] leading-[43px] lg:text-[48px] lg:leading-[58px] font-light uppercase font-montserrat text-center mb-10">
              <strong className="font-semibold">ÚNIKO IMÓVEIS</strong>
              <br />
              Exclusividade em cada metro quadrado
            </h1>

            <div className="flex justify-center gap-4 lg:gap-8">
              <Link
                href="/imoveis?city=curitiba"
                className="flex items-center bg-white text-[#343434] px-[18px] py-[13px] lg:px-[20px] lg:py-[15px] font-montserrat text-[15px] leading-[19px] lg:text-[18px] lg:leading-[22px] font-medium gap-[3px] shadow-[0px_3px_6px_#00000029] transition-all hover:bg-[#C5AF62] hover:text-white mb-2.5 lg:mb-0 justify-center"
              >
                Curitiba{" "}
                <LuArrowRight className="w-[15px] h-[15px] lg:w-[19px] lg:h-[19px]" />
              </Link>

              <Link
                href="/imoveis?city=belo-horizonte"
                className="flex items-center bg-white text-[#343434] px-[18px] py-[13px] lg:px-[20px] lg:py-[15px] font-montserrat text-[15px] leading-[19px] lg:text-[18px] lg:leading-[22px] font-medium gap-[3px] shadow-[0px_3px_6px_#00000029] transition-all hover:bg-[#C5AF62] hover:text-white mb-2.5 lg:mb-0 justify-center"
              >
                Belo Horizonte{" "}
                <LuArrowRight className="w-[15px] h-[15px] lg:w-[19px] lg:h-[19px]" />
              </Link>
            </div>
          </div>
        </div>

        <Suspense fallback={<div className="w-full h-screen bg-black" />}>
          <VideoHome />
        </Suspense>
      </div>
    </div>
  );
}

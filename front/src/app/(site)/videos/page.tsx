import { Breadcrumb } from "@/components/Breadcrumb";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import YouTubeVideosList from "@/components/YouTubeVideosList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vídeos - Úniko Imóveis",
  description: "Úniko Imóveis - Melhores imóveis no Brasil",
};

export default async function Videos() {
  return (
    <div>
      <Header />

      <main>
        <Breadcrumb title="VÍDEOS" />

        <div className="container !mt-10">
          <YouTubeVideosList />
        </div>
      </main>

      <Footer />
    </div>
  )
}
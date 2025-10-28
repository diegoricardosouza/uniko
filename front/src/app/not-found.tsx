import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import NotFound from "@/components/NotFound";
import { Suspense } from "react";

export default function NotFoundPage() {

  return (
    <div>
      <Header />
      <main className="container py-20">
        <Suspense fallback={<div>Carregando...</div>}>
          <NotFound />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import NotFound from "@/components/NotFound";

export default function NotFoundPage() {

  return (
    <div>
      <Header />
      <main className="container py-20">
        <NotFound />
      </main>
      <Footer />
    </div>
  );
}
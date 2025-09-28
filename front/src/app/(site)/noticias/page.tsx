import { getPostsPaginateAction } from "@/app/actions/posts/get-posts-paginate";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CardPost } from "@/components/CardPost";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Pagination } from "@/components/Pagination";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Notícias - Úniko Imóveis",
  description: "Úniko Imóveis - Melhores imóveis no Brasil",
};

interface NoticiasProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    limit?: string;
  }>;
}

export default async function Noticias({ searchParams }: NoticiasProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 9; // 9 posts por página (3x3 grid)
  const postsData = await getPostsPaginateAction({
    page,
    limit
  });

  // console.log({ params, page, limit });
  
  
  return (
    <div>
      <Header />

      <main>
        <Breadcrumb title="NOTÍCIAS" />

        <section className="container !mt-5">
          <header className="text-center mb-[30px]">
            <h2
              className="text-gold text-[30px] md:text-[38px] font-montserrat tracking-[-0.95px] font-normal leading-[35px] md:leading-[47px] mb-[5px]"
            >
              As novidades mais recentes <strong className="font-semibold">estão aqui!</strong>
            </h2>
          </header>

          <div className="flex flex-col md:grid grid-cols-3 gap-[26px]">
            {postsData.data.map((post) => (
              <CardPost key={post.id} post={post} />
            ))}
          </div>

          <div className="mt-10">
            {postsData.meta.totalPages > 1 && (
              <Pagination
                page={postsData.meta.page}
                limit={postsData.meta.limit}
                total={postsData.meta.total}
                showInfo={false} // opcional, padrão é true
              />
            )}
          </div>

          <div className="flex justify-center mt-[60px] mb-10">
            <Image 
              src="/anuncio.jpg"
              width={1200}
              height={320}
              alt="Anúncio"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
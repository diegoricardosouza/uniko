import { getPostsPaginateAction } from "@/app/actions/posts/get-posts-paginate";
import { getPropertiesPaginateAction } from "@/app/actions/properties/get-properties-paginate";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CardPost } from "@/components/CardPost";
import { CardProperty } from "@/components/CardProperty";
import { DifferentiatedService } from "@/components/DifferentiatedService";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Pagination } from "@/components/Pagination";
import { FilterProperty } from "./_components/FilterProperty";

interface PropertiesProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    limit?: string;
    city?: string;
    finalidade?: string;
    type?: string;
    orderDirection?: string;
  }>;
}

export default async function Imoveis({ searchParams }: PropertiesProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 9; // 9 posts por página (3x3 grid)
  const properties = await getPropertiesPaginateAction({
    city: params.city,
    finalities: params.finalidade ? [params.finalidade] : undefined,
    page,
    limit,
    orderDirection: params.orderDirection,
    search: params.search,
    types: [params.type!]
  });

  console.log({ params, properties });
  
  
  const recentPosts = await getPostsPaginateAction({
    limit: 3
  });
  
  return (
    <div>
      <Header />

      <main>
        <Breadcrumb title={params.finalidade?.toUpperCase() || params.type?.toUpperCase() || 'IMÓVEIS'} />

        <FilterProperty total={properties.meta.total} />

        <section className="container flex flex-col gap-[30px] !mt-[30px]">
          {properties.data.map((property) => (
            <CardProperty key={property.id} property={property} type={params.finalidade} />
          ))}
        </section>
        
        <div className="container !mt-[60px]">
          {properties.meta.totalPages > 1 && (
            <Pagination
              page={properties.meta.page}
              limit={properties.meta.limit}
              total={properties.meta.total}
              showInfo={false} // opcional, padrão é true
            />
          )}
        </div>

        <DifferentiatedService />

        <section className="container !mt-10">
          <header className="text-center mb-[30px]">
            <h2
              className="text-gold text-[30px] md:text-[38px] font-montserrat tracking-[-0.95px] font-normal leading-[35px] md:leading-[47px] mb-[5px]"
            >
              As novidades mais recentes <strong className="font-semibold">estão aqui!</strong>
            </h2>

            <h4
              className="text-[19px] md:text-[22px] font-semibold text-title leading-[22px] md:leading-[27px] font-montserrat"
            >
              blog
            </h4>
          </header>

          <div className="flex flex-col md:grid grid-cols-3 gap-[26px] mb-[50px]">
            {recentPosts.data.map(post => (
              <CardPost key={post.id} post={post} className="border-0" type="simple" />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
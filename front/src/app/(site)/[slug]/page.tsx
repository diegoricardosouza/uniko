import { getPostsRelatedAction } from "@/app/actions/posts/get-post-related";
import { getPostSlugAction } from "@/app/actions/posts/get-post-slug";
import { getPropertiesPaginateAction } from "@/app/actions/properties/get-properties-paginate";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CardPost } from "@/components/CardPost";
import { CardPropertySingle } from "@/components/CardPropertySingle";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import NotFound from "@/components/NotFound";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

interface SingleBlogProps {
  params: Promise<{ slug: string; }>;
}

export async function generateMetadata({ params }: SingleBlogProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getPostSlugAction(slug);

    if (!post) {
      return {
        title: "Post não encontrado - Úniko Imóveis",
        description: "Úniko Imóveis - Melhores imóveis no Brasil",
      };
    }

    const featuredImage = post?.medias?.find(media => media.mediaType === 'featured_image')?.url;

    return {
      title: `${post.name} - Úniko Imóveis`,
      description: post.subtitle || post.content || "Úniko Imóveis - Melhores imóveis no Brasil",
      openGraph: {
        title: post.name,
        description: post.subtitle || post.content,
        images: featuredImage ? [`${process.env.NEXT_PUBLIC_API_URL}${featuredImage}`] : [],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: post.name,
        description: post.subtitle || post.content,
        images: featuredImage ? [`${process.env.NEXT_PUBLIC_API_URL}${featuredImage}`] : [],
      },
    };
  } catch (error) {
    console.error('Erro ao gerar metadata:', error);

    return {
      title: "Erro - Úniko Imóveis",
      description: "Úniko Imóveis - Melhores imóveis no Brasil",
    };
  }
}

export default async function SingleBlog({ params }: SingleBlogProps) {
  const { slug } = await params;

  try {
    const post = await getPostSlugAction(slug);
    const properties = await getPropertiesPaginateAction({ limit: 4, finalities: ["lancamentos"] });

    if (!post) {
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

    const relatedPosts = await getPostsRelatedAction(post.id, 2);
    const featuredImage = post?.medias?.find(media => media.mediaType === 'featured_image')?.url;

    return (
      <div>
        <Header />

        <main>
          <Breadcrumb title="NOTÍCIAS" />

          <article className="container !mt-[19px]">
            <div>
              <Link
                href="/noticias"
                className="font-inter text-[15px] leading-[20px] text-content hover:text-gold transition-colors"
              >
                {"<"} voltar
              </Link>
            </div>

            <div className="mt-[30px] mb-1">
              <span className="uppercase font-inter text-[14px] leading-[19px] text-title">
                {post?.categories?.[0]?.name}
              </span>
            </div>

            <div className="flex flex-col md:flex-row gap-[26px]">
              <div className="flex-1">
                <h1
                  className="text-gold text-[30px] md:text-[38px] font-montserrat tracking-[-0.95px] font-semibold leading-[35px] md:leading-[42px] mb-[10px]"
                >
                  {post.name}
                </h1>
                {post.subtitle && (
                  <p className="font-inter text-[17px] leading-[20px] font-light text-content">
                    {post.subtitle}
                  </p>
                )}

                <div className="mt-10 mb-[30px]">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${featuredImage!}`}
                    width={788}
                    height={350}
                    className="w-full h-auto"
                    priority
                    alt={post.name}
                  />
                </div>

                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: post.content! }}
                />

                <div className="flex flex-wrap md:flex-row gap-[15px]">
                  {post.categories?.map(category => (
                    <span
                      key={category.id}
                      className="inline-flex font-inter text-[15px] font-light leading-5 text-black p-[15px] bg-bggray"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>

                <Link
                  href="/noticias"
                  className="inline-block font-inter text-[15px] leading-[20px] text-content hover:text-gold transition-colors my-[30px]"
                >
                  {"<"} voltar
                </Link>

                <hr className="border-0 w-full h-[1px] bg-gold m-0 mb-[30px]" />

                <section className="mb-[60px]">
                  <h2 className="text-gold text-[22px] leading-[26px] font-montserrat mb-[30px]">
                    Publicações <strong className="font-semibold">Relacionadas</strong>
                  </h2>

                  <div className="flex flex-col md:grid grid-cols-2 gap-[26px]">
                    {relatedPosts.map(post => (
                      <CardPost key={post.id} post={post} className="border-0" type="simple" />
                    ))}
                  </div>
                </section>
              </div>

              <aside className="w-full max-w-[376px] border-t border-gold">
                <header>
                  <h2 className="font-montserrat text-[25px] tracking-[-0.63px] leading-[30px] text-black font-normal my-5 text-center">
                    Encontre seu lar, <strong className="font-semibold">doce lar!</strong>
                  </h2>
                </header>

                <div className="flex flex-col gap-[60px] mb-[60px] md:mb-0">
                  {properties.data.map((property) => (
                    <CardPropertySingle key={property.id} property={property} />
                  ))}
                </div>
              </aside>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Erro ao carregar post:', error);

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
}
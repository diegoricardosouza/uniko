import { getPostsRelatedAction } from "@/app/actions/posts/get-post-related";
import { getPostSlugAction } from "@/app/actions/posts/get-post-slug";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CardPost } from "@/components/CardPost";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import Image from "next/image";
import Link from "next/link";

interface SingleBlogProps {
  params: { slug: string; };
}

export default async function SingleBlog({ params }: SingleBlogProps) {
  const { slug } = await params;
  const post = await getPostSlugAction(slug);
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

              <hr className="border-0 w-full h-[1px] bg-gold m-0 mb-[30px]"/>

              <section className="mb-[60px]">
                <h2 className="text-gold text-[22px] leading-[26px] font-montserrat mb-[30px]">
                  Publicações <strong className="font-semibold">Relacionadas</strong>
                </h2>

                <div className="grid grid-cols-2 gap-[26px]">
                  {relatedPosts.map(post => (
                    <CardPost key={post.id} post={post} className="border-0" type="simple" />
                  ))}
                </div>
              </section>
            </div>

            <aside className="w-full max-w-[376px]"></aside>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
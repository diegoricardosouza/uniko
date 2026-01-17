/* eslint-disable @next/next/no-img-element */
import { Post } from "@/entities/Post";
import { trimWords } from "@/lib/trimWords";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

interface CardPostProps {
  post: Post;
  className?: string;
  type: "with button" | "simple";
}

export function CardPost({ post, className, type }: CardPostProps) {
  const featuredImageUrl = post.medias?.filter(
    (media) => media.mediaType === "featured_image",
  )[0]?.url;
  const category = post.categories?.[0]?.name;

  return (
    <article>
      <div
        className={cn(
          "border-b border-gold",
          type === "with button" && "pb-[30px]",
          className,
        )}
      >
        <Link href={`/${post.slug!}`}>
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}${featuredImageUrl!}`}
            width={376}
            height={282}
            alt={post.name}
            className="rounded-[0_20px_20px_20px] h-[282px] w-full object-cover object-center"
          />
          <header className="mt-[9px]">
            <span className="font-inter text-[14px] text-title font-medium uppercase">
              {category}
            </span>
            <h2 className="font-montserrat text-gold text-[22px] leading-[26px] font-medium mb-[10px]">
              {post.name}
            </h2>
          </header>
          <p className="font-inter text-[15px] md:text-[17px] text-content leading-[20px] font-normal">
            {trimWords(post.subtitle! || post.content!, 16)}
          </p>
        </Link>

        {type === "with button" && (
          <div className="flex justify-center mt-[15px]">
            <Link
              href={`/${post.slug!}`}
              className="button-geral !text-white shadow-[0px_3px_6px_#00000029] !bg-black hover:!bg-gold"
            >
              CONTINUE LENDO
              <LuArrowRight className="w-[15px] h-[15px] lg:w-[18px] lg:h-[18px] ml-[-3px]" />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}

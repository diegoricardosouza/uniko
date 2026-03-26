import Image from "next/image";


interface HeaderYoutubeProps {
  title?: string;
  description?: string;
  linkYoutube?: string;
}

export function HeaderYoutube({ title, description, linkYoutube }: HeaderYoutubeProps) {
  return (
    <div className="container md:flex gap-[29px]">
      <div className="mb-[20px] md:mb-0">
        <Image 
          src="/logo-circle.png"
          width={150}
          height={150}
          alt="Logo Úniko"
          className="mx-auto"
          unoptimized
        />
      </div>

      <div className="flex-1">
        <h1 className="text-gold text-[30px] md:text-[36px] font-montserrat font-light leading-[35px] md:leading-[47px]">
          {title}
        </h1>
        <span className="text-[19px] md:text-[22px] font-medium text-title leading-[22px] md:leading-[29px] font-montserrat">
          @unikoimoveis
        </span>

        <div className="mt-6 md:flex gap-[100px]">
          <p className="flex-1 font-montserrat text-[18px] font-normal text-title leading-[22px] mb-3 md:mb-0">
            {description}
          </p>

          <a href={linkYoutube} target="_blank" rel="noopener noreferrer">
            <Image
              src="/btn-youtube.png"
              width={199}
              height={47}
              alt="Botão YouTube"
              className="mx-auto"
              unoptimized
            />
          </a>
        </div>
      </div>
    </div>
  )
}
import { ReactNode } from "react";

interface CardAnuncieProps {
  icon: ReactNode;
  title: string;
  content: string;
}

export function CardAnuncie({ icon, title, content }: CardAnuncieProps) {
  return (
    <article className="w-full max-w-full md:max-w-[288px] bg-bggray rounded-[0_20px_20px_20px] p-[19px] flex flex-col items-center pt-0">
      <div className="bg-white rounded-[0_20px_20px_20px] shadow-[0px_0px_5px_#00000029] w-[90px] h-[90px] flex items-center justify-center mt-[-64px]">
        {icon}
      </div>

      <header className="text-center mt-[15px] font-montserrat">
        <h2 className="text-gold text-[22px] font-semibold leading-[27px]">
          {title}
        </h2>

        <p
          className="text-[18px] leading-[22px] text-title mt-[5px]"
        >
          {content}
        </p>
      </header>
    </article>
  )
}
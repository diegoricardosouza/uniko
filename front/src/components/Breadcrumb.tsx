interface BreadcrumbProps {
  title: string;
}

export function Breadcrumb({ title }: BreadcrumbProps) {
  return (
    <div className="bg-gold">
      <div className="container py-[10px]">
        <h1
          className="text-[30px] md:text-[38px] font-montserrat text-white font-normal tracking-[-0.95px] leading-[40px] md:leading-[47px] text-center"
        >
          {title}
        </h1>
      </div>
    </div>
  )
}
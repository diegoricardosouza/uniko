import { Setting } from "@/entities/Setting"
import Image from "next/image"

interface WhatsAppProps {
  settings: Setting
}

export function WhatsApp({ settings }: WhatsAppProps) {
  return (
    <div className="fixed right-5 bottom-5 flex flex-col items-end z-50">
      {settings.unitCompany?.map((unit) => {
        const whats = unit.cellphone?.replace(/\D/g, '')
        const names = unit.name?.replace(/^(Matriz|Filial)\s+/, '').replace(/<\/?strong>/g, '')
        
        return (
          <a key={unit.id} href={`https://wa.me/55${whats}`} target="_blank" className="flex items-center gap-[10px]">
            <span
              className="bg-white text-[15px] font-inter text-title shadow-[0px_3px_6px_#00000029] rounded-[5px] px-[11px] py-[7px]"
            >
              {names}
            </span>
            <Image
              src="/icon-whats.png"
              width={61}
              height={60}
              alt="WhatsApp"
              unoptimized
            />
          </a>
        )
      })}
    </div>
  )
}
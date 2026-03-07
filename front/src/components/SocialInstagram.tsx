import { SiInstagram } from "react-icons/si";

export function SocialInstagram() {
  return (
    <ul className="flex items-center gap-4 justify-center">
      <li>
        <a href="https://www.instagram.com/unikoimoveis?igsh=Y3BpaTNwaWVxbXd4" className="flex items-center gap-2 group-social group" target="_blank">
          <SiInstagram className="text-[#343434] md:text-white w-[25px] h-[25px] transition-all group-hover:text-gold"/>
          <span className="text-[#343434] md:text-white text-sm font-dmsans font-medium transition-all group-hover:text-gold">
            CURITIBA
          </span>
        </a>
      </li>
      <li>
        <a href="https://www.instagram.com/unikoimoveisbh?igsh=MTBveGJrZDdjZmNibQ==" target="_blank" className="flex items-center gap-2 group-social group">
          <SiInstagram className="text-[#343434] md:text-white w-[25px] h-[25px] transition-all group-hover:text-gold"/>
          <span className="text-[#343434] md:text-white text-sm font-dmsans font-medium transition-all group-hover:text-gold">
            BH
          </span>
        </a>
      </li>
    </ul>
  )
}
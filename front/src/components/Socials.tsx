import { FaInstagram, FaYoutube } from "react-icons/fa6";
import { IoLogoFacebook } from "react-icons/io";

export function Socials() {
  return (
    <ul className="flex items-center gap-4 justify-center">
      <li>
        <a href="#" target="_blank">
          <IoLogoFacebook className="w-[34px] h-[34px] text-[#343434] lg:text-white transition-all hover:text-[#C5AF62]" />
        </a>
      </li>
      <li>
        <a href="#" target="_blank">
          <FaInstagram className="w-[29px] h-[29px] text-[#343434] lg:text-white transition-all hover:text-[#C5AF62]" />
        </a>
      </li>
      <li>
        <a href="#" target="_blank">
          <FaYoutube className="w-[29px] h-[29px] text-[#343434] lg:text-white transition-all hover:text-[#C5AF62]" />
        </a>
      </li>
    </ul>
  )
}
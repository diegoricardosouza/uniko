/* eslint-disable @next/next/no-assign-module-variable */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconSpec } from '@/app/(dashboard)/dashboard/settings/_components/SocialIcon';
import dynamicIconImports from "lucide-react/dynamicIconImports";
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";

export const generateIconSvg = async (spec: IconSpec): Promise<string> => {
  try {
    if (spec.library === "lucide") {
      const iconName = spec.name as keyof typeof dynamicIconImports;
      const loader = dynamicIconImports[iconName];

      if (loader) {
        const module = await loader();
        const IconComponent = module.default;
        return ReactDOMServer.renderToStaticMarkup(React.createElement(IconComponent));
      }
    }

    if (spec.library === "react-icons") {
      const iconPack = spec.pack === "fa" ? FaIcons : AiIcons;
      const IconComponent = (iconPack as any)[spec.name];

      if (IconComponent) {
        return ReactDOMServer.renderToStaticMarkup(React.createElement(IconComponent));
      }
    }

    return "";
  } catch (error) {
    console.error("Erro ao gerar SVG do ícone:", error);
    return "";
  }
};
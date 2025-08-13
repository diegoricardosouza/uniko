/* eslint-disable @typescript-eslint/no-explicit-any */
import dynamicIconImports from "lucide-react/dynamicIconImports";
import React, { Suspense, useMemo } from "react";

export type IconSpec =
  | { library: "lucide"; name: keyof typeof dynamicIconImports | string }
  | { library: "react-icons"; pack: "fa" | "ai" | "bs" | "ci"; name: string };

interface SocialIconProps {
  spec: IconSpec | undefined;
  className?: string;
  size?: number;
}

const Fallback = ({ className, size = 20 }: { className?: string; size?: number }) => (
  <div
    className={"inline-block rounded-md bg-accent " + (className ?? "")}
    style={{ width: size, height: size }}
    aria-hidden
  />
);

const SocialIcon: React.FC<SocialIconProps> = ({ spec, className, size = 20 }) => {
  const LazyIcon = useMemo(() => {
    if (!spec) return null as any;

    if (spec.library === "lucide") {
      const loader = (dynamicIconImports as Record<string, any>)[spec.name as string];
      if (!loader) return null as any;
      return React.lazy(loader) as any;
    }

    if (spec.library === "react-icons") {
      const pack = spec.pack;
      const name = spec.name;

      return React.lazy(async () => {
        let mod: Record<string, any>;

        switch (pack) {
          case "fa":
            mod = await import("react-icons/fa");
            break;
          case "ai":
            mod = await import("react-icons/ai");
            break;
          case "bs":
            mod = await import("react-icons/bs");
            break;
          case "ci":
            mod = await import("react-icons/ci");
            break;
          default:
            return { default: () => null } as any;
        }

        const Comp = mod[name];
        return { default: Comp ?? (() => null) } as any;
      }) as any;
    }

    return null as any;
  }, [spec]);

  if (!spec || !LazyIcon) return <Fallback className={className} size={size} />;

  const IconComp: any = LazyIcon as any;

  return (
    <Suspense fallback={<Fallback className={className} size={size} />}>
      <IconComp className={className} size={size} />
    </Suspense>
  );
};

export default SocialIcon;
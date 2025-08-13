/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { useEffect, useState } from "react";
import { FaEnvelope, FaFacebook, FaGithub, FaGlobe, FaInstagram, FaLinkedin, FaPhone, FaTwitter, FaYoutube } from "react-icons/fa";
import SocialIcon, { IconSpec } from "./SocialIcon";

interface IconPickerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (icon: IconSpec) => void;
}

const lucideSuggestions = [
  "facebook",
  "instagram",
  "twitter",
  "linkedin",
  "youtube",
  "github",
  "globe",
  "phone",
  "mail",
  "a-arrow-down",
  "alarm-clock",
  "alarm-smoke",
];

const reactIconSuggestions: { pack: "fa"; name: string; label: string; Comp: any }[] = [
  { pack: "fa", name: "FaFacebook", label: "Facebook", Comp: FaFacebook },
  { pack: "fa", name: "FaInstagram", label: "Instagram", Comp: FaInstagram },
  { pack: "fa", name: "FaTwitter", label: "Twitter", Comp: FaTwitter },
  { pack: "fa", name: "FaLinkedin", label: "LinkedIn", Comp: FaLinkedin },
  { pack: "fa", name: "FaYoutube", label: "YouTube", Comp: FaYoutube },
  { pack: "fa", name: "FaGithub", label: "GitHub", Comp: FaGithub },
  { pack: "fa", name: "FaGlobe", label: "Globe", Comp: FaGlobe },
  { pack: "fa", name: "FaPhone", label: "Telefone", Comp: FaPhone },
  { pack: "fa", name: "FaEnvelope", label: "E-mail", Comp: FaEnvelope },
];

const gridItemBase =
  "flex flex-col items-center justify-center gap-2 p-3 bg-[#f7f7f7] rounded-md hover:bg-accent transition-smooth cursor-pointer";

export default function IconPickerDialog({ open, onOpenChange, onSelect }: IconPickerDialogProps) {
  const [tab, setTab] = useState("sugestoes");
  const [query, setQuery] = useState("");
  const [lucideResults, setLucideResults] = useState<string[]>([]);
  const [reactResults, setReactResults] = useState<{ pack: "fa" | "ai" | "bs" | "ci"; name: string }[]>([]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setLucideResults([]);
      setReactResults([]);
      setTab("sugestoes");
    }
  }, [open]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setLucideResults([]);
      setReactResults([]);
      return;
    }
    // Lucide: filter keys and limit
    const lucideKeys = Object.keys(dynamicIconImports).filter((k) => k.includes(q)).slice(0, 60);
    setLucideResults(lucideKeys);

    // React Icons: search FA and AI packs lazily
    (async () => {
      const results: { pack: "fa" | "ai" | "bs" | "ci"; name: string }[] = [];
      const [fa, ai, bs, ci] = await Promise.all([
        import("react-icons/fa"),
        import("react-icons/ai"),
        import("react-icons/bs"),
        import("react-icons/ci"),
      ]);
      for (const [name] of Object.entries(fa)) {
        if (name.toLowerCase().includes(q)) results.push({ pack: "fa", name });
        if (results.length >= 60) break;
      }

      if (results.length < 60) {
        for (const [name] of Object.entries(ai)) {
          if (name.toLowerCase().includes(q)) results.push({ pack: "ai", name });
          if (results.length >= 120) break;
        }
      }

      if (results.length < 120) {
        for (const [name] of Object.entries(bs)) {
          if (name.toLowerCase().includes(q)) results.push({ pack: "bs", name });
          if (results.length >= 180) break;
        }
      }

      if (results.length < 180) {
        for (const [name] of Object.entries(ci)) {
          if (name.toLowerCase().includes(q)) results.push({ pack: "ci", name });
          if (results.length >= 240) break;
        }
      }
      setReactResults(results.slice(0, 120));
    })();
  }, [query]);

  const handleSelect = (icon: IconSpec) => {
    onSelect(icon);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl h-[80vh] flex flex-col p-0">
        <div className="p-6 pb-0">
          <DialogHeader>
            <DialogTitle>Escolher Ícone</DialogTitle>
            <DialogDescription>Selecione um ícone do Lucide ou React Icons</DialogDescription>
          </DialogHeader>
        </div>

        <div className="flex flex-col flex-1 px-6 pb-6">
          <Tabs value={tab} onValueChange={setTab} className="flex flex-col h-full">
            <TabsList className="w-fit">
              <TabsTrigger value="sugestoes">Sugestões</TabsTrigger>
              <TabsTrigger value="buscar">Buscar</TabsTrigger>
            </TabsList>

            <TabsContent value="sugestoes" className="flex-1 m-0 mt-4">
              <ScrollArea className="h-[calc(80vh-160px)]">
                <div className="space-y-6 pr-4">
                  <section>
                    <h4 className="mb-3 text-sm font-medium">Lucide</h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {lucideSuggestions.map((name) => (
                        <button
                          key={name}
                          type="button"
                          className={gridItemBase}
                          onClick={() => handleSelect({ library: "lucide", name })}
                        >
                          <SocialIcon spec={{ library: "lucide", name }} size={24} />
                          <span className="text-xs text-muted-foreground truncate w-full">{name}</span>
                        </button>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h4 className="mb-3 text-sm font-medium">React Icons</h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {reactIconSuggestions.map(({ pack, name, label, Comp }) => (
                        <button
                          key={name}
                          type="button"
                          className={gridItemBase}
                          onClick={() => handleSelect({ library: "react-icons", pack, name })}
                        >
                          <Comp size={24} />
                          <span className="text-xs text-muted-foreground truncate w-full">{label}</span>
                        </button>
                      ))}
                    </div>
                  </section>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="buscar" className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Busque por nome do ícone (ex: facebook, home, user)"
                  className="pl-9"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <div className="flex h-full max-h-[59vh] overflow-hidden">
                <ScrollArea className="pr-3">
                  {!query && (
                    <p className="text-sm text-muted-foreground">Digite para carregar mais ícones dinamicamente.</p>
                  )}

                  {query && (
                    <div className="space-y-6">
                      <section>
                        <h4 className="mb-3 text-sm font-medium">Lucide ({lucideResults.length})</h4>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-3 pb-3">
                          {lucideResults.map((name) => (
                            <button
                              key={name}
                              type="button"
                              className={gridItemBase}
                              onClick={() => handleSelect({ library: "lucide", name })}
                            >
                              <SocialIcon spec={{ library: "lucide", name }} size={24} />
                              <span className="text-xs text-muted-foreground truncate w-full">{name}</span>
                            </button>
                          ))}
                        </div>
                      </section>

                      <section>
                        <h4 className="mb-3 text-sm font-medium">React Icons ({reactResults.length})</h4>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-3 pb-3">
                          {reactResults.map(({ pack, name }) => (
                            <button
                              key={`${pack}-${name}`}
                              type="button"
                              className={gridItemBase}
                              onClick={() => handleSelect({ library: "react-icons", pack, name })}
                            >
                              <SocialIcon spec={{ library: "react-icons", pack, name }} size={24} />
                              <span className="text-xs text-muted-foreground truncate w-full">{name}</span>
                            </button>
                          ))}
                        </div>
                      </section>
                    </div>
                  )}
                </ScrollArea>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
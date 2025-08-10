'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import IconPickerDialog from "./IconPickerDialog";
import SocialIcon, { IconSpec } from "./SocialIcon";

export type SocialLink = {
  id: string;
  label: string;
  url: string;
  icon?: IconSpec;
};

const initialLinks: SocialLink[] = [
  {
    id: crypto.randomUUID(),
    label: "Facebook",
    url: "https://facebook.com/suaempresa",
    icon: { library: "lucide", name: "facebook" },
  },
  {
    id: crypto.randomUUID(),
    label: "Instagram",
    url: "https://instagram.com/suaempresa",
    icon: { library: "lucide", name: "instagram" },
  },
];

export default function SocialLinksForm() {
  const [links, setLinks] = useState<SocialLink[]>(initialLinks);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const addLink = () =>
    setLinks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), label: "", url: "", icon: undefined },
    ]);

  const removeLink = (id: string) => setLinks((prev) => (prev.length > 1 ? prev.filter((l) => l.id !== id) : prev));

  const updateLink = (id: string, key: keyof SocialLink, value: any) =>
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, [key]: value } : l)));

  const save = () =>
    toast.success("As redes sociais foram atualizadas com sucesso.");

  const openPicker = (id: string) => {
    setActiveId(id);
    setPickerOpen(true);
  };

  const handleSelectIcon = (icon: IconSpec) => {
    if (!activeId) return;
    updateLink(activeId, "icon", icon);
  };

  return (
    <Card className="bg-gradient-card shadow-card border-0">
      <CardHeader>
        <CardTitle>Redes Sociais</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Adicione, edite ou remova redes sociais.</p>
          <Button onClick={addLink} variant="outline" className="transition-smooth">
            <PlusCircle className="h-4 w-4 mr-2" />
            Adicionar Rede Social
          </Button>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {links.map((link, idx) => (
            <AccordionItem key={link.id} value={link.id} className="border-border">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-2">
                    <SocialIcon spec={link.icon} size={18} />
                    <span className="font-medium">{link.label?.trim() ? link.label : `Rede Social ${idx + 1}`}</span>
                  </div>
                  {links.length > 1 && (
                    <Button
                      asChild
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeLink(link.id);
                      }}
                    >
                      <div className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0">
                        <Trash2 className="!h-4 !w-4" />
                      </div>
                    </Button>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`label-${link.id}`}>Nome/Label *</Label>
                      <Input
                        id={`label-${link.id}`}
                        value={link.label}
                        onChange={(e) => updateLink(link.id, "label", e.target.value)}
                        className="transition-smooth focus:shadow-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`url-${link.id}`}>URL *</Label>
                      <Input
                        id={`url-${link.id}`}
                        value={link.url}
                        onChange={(e) => updateLink(link.id, "url", e.target.value)}
                        placeholder="https://..."
                        className="transition-smooth focus:shadow-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Ícone</Label>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 px-3 py-2 border rounded-md">
                        <SocialIcon spec={link.icon} size={20} />
                        <span className="text-xs text-muted-foreground">
                          {link.icon ? (link.icon.library === "lucide" ? String(link.icon.name) : `${link.icon.pack}:${link.icon.name}`) : "Nenhum"}
                        </span>
                      </div>
                      <Button type="button" variant="outline" onClick={() => openPicker(link.id)}>
                        Escolher Ícone
                      </Button>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Button onClick={save}>
          <Save className="h-4 w-4 mr-2" />
          Salvar Redes Sociais
        </Button>
      </CardContent>

      <IconPickerDialog open={pickerOpen} onOpenChange={setPickerOpen} onSelect={handleSelectIcon} />
    </Card>
  );
}
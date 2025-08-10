'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, PlusCircle, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Formulário para gerenciar múltiplas unidades da empresa

type Unit = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  description: string;
};

const initialUnits: Unit[] = [
  {
    id: crypto.randomUUID(),
    name: "ImobiTech Corretora - Matriz",
    email: "contato@imobitech.com",
    phone: "(11) 99999-9999",
    address: "Rua das Flores, 123 - Centro, São Paulo - SP",
    website: "www.imobitech.com",
    description:
      "Especializada em imóveis de alto padrão na região metropolitana de São Paulo.",
  },
];

export default function CompanyUnitsForm() {
  const [units, setUnits] = useState<Unit[]>(initialUnits);

  const addUnit = () =>
    setUnits((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: "",
        email: "",
        phone: "",
        address: "",
        website: "",
        description: "",
      },
    ]);

  const removeUnit = (id: string) =>
    setUnits((prev) => (prev.length > 1 ? prev.filter((u) => u.id !== id) : prev));

  const updateUnit = (id: string, key: keyof Unit, value: string) =>
    setUnits((prev) => prev.map((u) => (u.id === id ? { ...u, [key]: value } : u)));

  const saveUnits = () =>
    toast.success("As informações das unidades foram atualizadas com sucesso.");

  return (
    <Card className="bg-gradient-card shadow-card border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Unidades da Empresa
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Gerencie múltiplas unidades/filiais da sua empresa.
          </p>
          <Button onClick={addUnit} variant="outline" className="transition-smooth">
            <PlusCircle className="h-4 w-4 mr-2" />
            Adicionar Unidade
          </Button>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {units.map((unit, idx) => (
            <AccordionItem key={unit.id} value={unit.id} className="border-border">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {unit.name?.trim() ? unit.name : `Unidade ${idx + 1}`}
                    </span>
                  </div>
                  {units.length > 1 && (
                    <Button
                      asChild
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeUnit(unit.id);
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
                <div className="space-y-6 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`name-${unit.id}`}>Nome da Unidade *</Label>
                      <Input
                        id={`name-${unit.id}`}
                        value={unit.name}
                        onChange={(e) => updateUnit(unit.id, "name", e.target.value)}
                        className="transition-smooth focus:shadow-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`email-${unit.id}`}>E-mail *</Label>
                      <Input
                        id={`email-${unit.id}`}
                        type="email"
                        value={unit.email}
                        onChange={(e) => updateUnit(unit.id, "email", e.target.value)}
                        className="transition-smooth focus:shadow-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`phone-${unit.id}`}>Telefone *</Label>
                      <Input
                        id={`phone-${unit.id}`}
                        value={unit.phone}
                        onChange={(e) => updateUnit(unit.id, "phone", e.target.value)}
                        className="transition-smooth focus:shadow-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`website-${unit.id}`}>Website</Label>
                      <Input
                        id={`website-${unit.id}`}
                        value={unit.website}
                        onChange={(e) => updateUnit(unit.id, "website", e.target.value)}
                        className="transition-smooth focus:shadow-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`address-${unit.id}`}>Endereço *</Label>
                    <Input
                      id={`address-${unit.id}`}
                      value={unit.address}
                      onChange={(e) => updateUnit(unit.id, "address", e.target.value)}
                      className="transition-smooth focus:shadow-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`description-${unit.id}`}>Descrição</Label>
                    <Textarea
                      id={`description-${unit.id}`}
                      value={unit.description}
                      onChange={(e) => updateUnit(unit.id, "description", e.target.value)}
                      className="min-h-24 transition-smooth focus:shadow-primary"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Button
          onClick={saveUnits}
        >
          <Save className="h-4 w-4 mr-2" />
          Salvar Unidades
        </Button>
      </CardContent>
    </Card>
  );
};
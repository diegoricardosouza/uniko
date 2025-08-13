'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Building2, Clock, Mail, MapPin, Phone, PlusCircle, Save, Smartphone, Trash2 } from "lucide-react";
import { useCompanyUnitsController } from "../useCompanyUnitsController";




export default function CompanyUnitsForm() {
  const { form, fields, watchedUnits, control, addUnit, onSubmit, remove } = useCompanyUnitsController();

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <Card className="bg-gradient-card shadow-card border-0 py-0">
          <CardHeader className="gap-0">
            <CardTitle className="flex items-center gap-2 text-lg">
              Unidades da Empresa
            </CardTitle>
            <CardDescription>
              <p className="text-sm text-muted-foreground">
                Gerencie múltiplas unidades/filiais da sua empresa.
              </p>
            </CardDescription>
            <hr className="mt-[20px]" />
          </CardHeader>

          <CardContent className="space-y-6">
            <Button 
              onClick={addUnit} 
              variant="outline" 
              className="transition-smooth"
              type="button"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Adicionar Unidade
            </Button>

            <Accordion type="single" collapsible className="w-full">
              {fields.map((field, idx) => (
                <AccordionItem key={field.id} value={field.id} className="border-border">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium"
                          dangerouslySetInnerHTML={{
                            __html: watchedUnits?.[idx]?.name?.trim()
                              ? watchedUnits[idx].name
                              : `Unidade ${idx + 1}` 
                          }}
                        />
                      </div>
                      {fields.length > 1 && (
                        <Button
                          asChild
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            remove(idx);
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
                        <FormField
                          control={form.control}
                          name={`units.${idx}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome da Unidade *</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Building2 className="absolute left-3 top-[10px] h-4 w-4 text-gray-400" />
                                  <Input 
                                    type="text" 
                                    className="transition-smooth focus:shadow-primary pl-10" 
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={control}
                          name={`units.${idx}.email`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>E-mail *</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-[10px] h-4 w-4 text-gray-400" />
                                  <Input
                                    type="email"
                                    className="transition-smooth focus:shadow-primary pl-10"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={control}
                          name={`units.${idx}.phone`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Telefone *</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Phone className="absolute left-3 top-[10px] h-4 w-4 text-gray-400" />
                                  <Input
                                    type="text"
                                    className="transition-smooth focus:shadow-primary pl-10"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={control}
                          name={`units.${idx}.cellphone`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Celular *</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Smartphone className="absolute left-3 top-[10px] h-4 w-4 text-gray-400" />
                                  <Input
                                    type="text"
                                    className="transition-smooth focus:shadow-primary pl-10"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={control}
                        name={`units.${idx}.service`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Atendimento</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Clock className="absolute left-3 top-[10px] h-4 w-4 text-gray-400" />
                                <Input
                                  type="text"
                                  className="transition-smooth focus:shadow-primary pl-10"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={control}
                        name={`units.${idx}.address`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Endereço *</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-[10px] h-4 w-4 text-gray-400" />
                                <Input
                                  type="text"
                                  className="transition-smooth focus:shadow-primary pl-10"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <Button>
              <Save className="h-4 w-4 mr-2" />
              Salvar Unidades
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};
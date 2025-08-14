'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Setting } from "@/entities/Setting";
import { Link, Loader2, PlusCircle, Save, Share2, Trash2 } from "lucide-react";
import { useSocialLinksController } from "../useSocialLinksController";
import IconPickerDialog from "./IconPickerDialog";
import SocialIcon from "./SocialIcon";

interface  SocialLinksFormProps {
  setting: Setting[]
}

export default function SocialLinksForm({ setting }: SocialLinksFormProps) {
  const {
    form,
    watchedSocials,
    fields,
    pickerOpen,
    isLoading,
    openPicker,
    addLink,
    remove,
    onSubmit,
    handleSelectIcon,
    setPickerOpen
  } = useSocialLinksController(setting);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <Card className="bg-gradient-card shadow-card border-0 py-0">
          <CardHeader className="gap-0">
            <CardTitle className="flex items-center gap-2 text-lg">
              Redes Sociais
            </CardTitle>
            <CardDescription>
              <p className="text-sm text-muted-foreground">
                Adicione, edite ou remova redes sociais.
              </p>
            </CardDescription>
            <hr className="mt-[20px]" />
          </CardHeader>

          <CardContent className="space-y-6">
            <Button
              onClick={addLink}
              variant="outline"
              className="transition-smooth"
              type="button"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Adicionar Rede Social
            </Button>

            <Accordion type="single" collapsible className="w-full">
              {fields.map((field, idx) => (
                <AccordionItem key={field.id} value={field.id} className="border-border">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-2">
                        <SocialIcon spec={watchedSocials?.[idx]?.icon || field.icon} size={18} />
                        <span className="font-medium"
                          dangerouslySetInnerHTML={{
                            __html: watchedSocials?.[idx]?.label?.trim()
                              ? watchedSocials[idx].label
                              : `Rede Social ${idx + 1}`
                          }}
                        />
                      </div>
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          asChild
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
                    <div className="space-y-4 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`socials.${idx}.label`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome/Label *</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Share2 className="absolute left-3 top-[10px] h-4 w-4 text-gray-400" />
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
                          control={form.control}
                          name={`socials.${idx}.url`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>URL *</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Link className="absolute left-3 top-[10px] h-4 w-4 text-gray-400" />
                                  <Input
                                    type="text"
                                    placeholder="https://..."
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
                        control={form.control}
                        name={`socials.${idx}.icon`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ícone</FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 px-3 py-2 border rounded-md">
                                  <SocialIcon spec={field.value} size={20} />
                                  <span className="text-xs text-muted-foreground">
                                    {typeof field.value !== 'string'
                                      ? (field.value?.library === "lucide"
                                        ? String(field.value.name)
                                        : `${field.value?.pack}:${field.value?.name}`)
                                      : field.value}
                                  </span>
                                </div>
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => openPicker(idx)}
                                >
                                  Escolher Ícone
                                </Button>
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

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Atualizando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                    Salvar Redes Sociais
                </>
              )}
            </Button>
          </CardContent>

          <IconPickerDialog
            open={pickerOpen}
            onOpenChange={setPickerOpen}
            onSelect={handleSelectIcon}
          />
        </Card>
      </form>
    </Form>
  );
}
 
/* eslint-disable @next/next/no-img-element */
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bath, BedDouble, BookOpen, BookUser, Building, CalendarSearch, CarFront, DollarSign, FileSearch, ImageIcon, Images, LandPlot, ListOrdered, Loader2, MapPinCheckInside, MapPinHouse, PlusCircle, Save, Tag, Trash, Type } from "lucide-react";
import dynamic from "next/dynamic";
import Gallery from "../../_components/Gallery";
import { useEditPropertyController } from "../edit/[id]/useEditPropertyController";


// Importação dinâmica sem SSR
const TinyEditor = dynamic(() => import('../../_components/TinyEditor'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-md flex items-center justify-center gap-2">
    <Loader2 className="h-6 w-6 text-gray-500 animate-spin" />
    Carregando editor...
  </div>
})


export function FormEditProperty() {
  const {
    form, 
    handleSubmit, 
    handleRemoveImage, 
    setImagePreview, 
    imagePreview, 
    isLoading,
    types,
    finalities,
    cities,
    zipcodeValid,
    selectedCity,
    isLoadingCities,
    isLoadingFinalities,
    isLoadingTypes,
    fields,
    append,
    remove,
    fieldsInfra,
    appendInfra,
    removeInfra,
    gallery,
    isDataLoaded,
    removeExistingGalleryImage
  } = useEditPropertyController();

  return (
    <div className="grid gap-4 md:grid-cols-1">
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Building className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <CardTitle className="text-xl">Editar Imóvel</CardTitle>
              <CardDescription>Edite o imóvel para o seu site</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Coluna 1 */}
                <div className="space-y-4 col-span-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título do Imóvel</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Type className="absolute left-3 top-[10px] h-4 w-4 text-gray-400" />
                            <Input placeholder="Digite o título do seu imóvel" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="reference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Referência</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <FileSearch className="absolute left-3 top-[10px] h-4 w-4 text-gray-400" />
                            <Input placeholder="Referência do seu imóvel" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col lg:grid grid-cols-3 gap-3">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preço</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-[10px] h-4 w-4 text-gray-400" />
                              <Input type="number" placeholder="Preço do seu imóvel" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormDescription>Ex. 99999.99</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="priceCondominium"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preço do Condomínio</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-[10px] h-4 w-4 text-gray-400" />
                              <Input type="number" placeholder="Preço do Condomínio do seu imóvel" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormDescription>Ex. 99999.99</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="priceIptu"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preço do IPTU</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-[10px] h-4 w-4 text-gray-400" />
                              <Input type="number" placeholder="Preço do IPTU do seu imóvel" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormDescription>Ex. 99999.99</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="delivery"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Previsão Entrega</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <CalendarSearch className="absolute left-3 top-[10px] h-4 w-4 text-gray-400" />
                            <Input placeholder="Previsão Entrega do seu imóvel" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col lg:grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="totalArea"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Área Total</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <LandPlot className="absolute left-3 top-[10px] h-4 w-4 text-gray-400" />
                              <Input type="number" placeholder="Área Total do seu imóvel" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="privateArea"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Área Privativa</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <LandPlot className="absolute left-3 top-[10px] h-4 w-4 text-gray-400" />
                              <Input type="number" placeholder="Área Privativa do seu imóvel" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-col lg:grid grid-cols-3 gap-3">
                    <FormField
                      control={form.control}
                      name="bedrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quartos</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <BedDouble className="absolute left-3 top-[10px] h-4 w-4 text-gray-400" />
                              <Input type="number" min={0} placeholder="Total de Quartos do seu imóvel" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bathrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Banheiros</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Bath className="absolute left-3 top-[10px] h-4 w-4 text-gray-400" />
                              <Input type="number" min={0} placeholder="Total de Banheiros do seu imóvel" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="parkingSpaces"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vagas de Garagem</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <CarFront className="absolute left-3 top-[10px] h-4 w-4 text-gray-400" />
                              <Input type="number" min={0} placeholder="Total de Vagas de Garagem do seu imóvel" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-col lg:grid grid-cols-3 gap-3">
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CEP</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <BookUser className="absolute left-3 top-[10px] h-4 w-4 text-gray-400" />
                              <Input maxLength={8} placeholder="CEP do seu imóvel" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                          {zipcodeValid && (
                            <span className="flex gap-2 items-center text-red-700 text-xs">{zipcodeValid}</span>
                          )}
                        </FormItem>
                      )}
                    />

                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Endereço</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <MapPinHouse className="absolute left-3 top-[10px] h-4 w-4 text-gray-400" />
                                <Input placeholder="Endereço do seu imóvel" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col lg:grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <ListOrdered className="absolute left-3 top-[10px] h-4 w-4 text-gray-400" />
                              <Input type="number" min={0} placeholder="Número do seu imóvel" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="complement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Complemento</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPinCheckInside className="absolute left-3 top-[10px] h-4 w-4 text-gray-400" />
                              <Input placeholder="Complemento do seu imóvel" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="characteristics"
                    render={() => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Características</FormLabel>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => append({ name: '' })}
                            className="flex items-center gap-2"
                          >
                            <PlusCircle className="h-4 w-4" />
                            Adicionar
                          </Button>
                        </div>
                        <div className="space-y-3 mt-2">
                          {fields.map((field, index) => (
                            <div key={field.id} className="flex gap-2 items-center">
                              <Input
                                {...form.register(`characteristics.${index}.name`)}
                                placeholder={`Característica ${index + 1}`}
                                defaultValue={field.name}
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => remove(index)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <FormDescription>
                          Adicione quantas itens quiser (opcional).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="infrastructures"
                    render={() => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Infraestrutura</FormLabel>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => appendInfra({ name: '' })}
                            className="flex items-center gap-2"
                          >
                            <PlusCircle className="h-4 w-4" />
                            Adicionar
                          </Button>
                        </div>
                        <div className="space-y-3 mt-2">
                          {fieldsInfra.map((field, index) => (
                            <div key={field.id} className="flex gap-2 items-center">
                              <Input
                                {...form.register(`infrastructures.${index}.name`)}
                                placeholder={`Infraestrutura ${index + 1}`}
                                defaultValue={field.name}
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                onClick={() => removeInfra(index)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <FormDescription>
                          Adicione quantas itens quiser (opcional).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-gray-400" />
                          Conteúdo
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <TinyEditor 
                              initialValue={field.value}
                              onEditorChange={field.onChange}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gallery"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Images className="h-4 w-4 text-gray-400" />
                          Galeria
                        </FormLabel>
                        <FormControl>
                          {isDataLoaded ? (
                            <Gallery
                              value={field.value || []}
                              onChange={field.onChange}
                              maxFiles={50}
                              maxSize={5 * 1024 * 1024}
                              accept="image/*"
                              disabled={isLoading}
                              initialFiles={gallery}
                              onRemoveFile={(id) => {
                                // Se for uma imagem antiga (vem de initialFiles)
                                removeExistingGalleryImage(id)

                                // Se for uma imagem nova (vem de value)
                                //removeNewGalleryImage(id)
                              }}
                            />
                          ) : (
                            <div className="min-h-52 border border-dashed rounded-xl p-4 flex items-center justify-center">
                              <div className="flex items-center gap-2 text-gray-400">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Carregando galeria...
                              </div>
                            </div>
                          )}
                        </FormControl>
                        <FormDescription>
                          Adicione até 50 imagens para a galeria do imóvel
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Coluna 2 */}
                <div className="space-y-4 col-span-1">
                  <FormField
                    control={form.control}
                    name="featuredImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Imagem de Destaque</FormLabel>
                        <FormControl>
                          <div className="space-y-4 relative">
                            {imagePreview && (
                              <Button 
                                variant="destructive" 
                                className="absolute z-50 right-8 top-8" 
                                type="button"
                                onClick={handleRemoveImage}
                              >
                                <Trash />
                              </Button>
                            )}

                            <div
                              className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors cursor-pointer group"
                              onClick={() => document.getElementById("image-upload")?.click()}
                            >
                              <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(event) => {
                                  const file = event.target.files?.[0];
                                  if (file) {
                                    setImagePreview(URL.createObjectURL(file)); // mantém a prévia
                                    field.onChange(file); // ⚠️ importante: conecta com RHF
                                  }
                                }}
                              />
                              {imagePreview ? (
                                <div className="relative">
                                  <img
                                    src={imagePreview || "/placeholder.svg"}
                                    alt="Preview"
                                    className="w-full h-48 object-cover rounded-lg"
                                  />
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-lg flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                      <div className="bg-white rounded-full p-2">
                                        <ImageIcon className="h-5 w-5 text-gray-600" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center">
                                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400 group-hover:text-gray-500 transition-colors" />
                                  <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                                      Clique para selecionar uma imagem
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF até 10MB</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription>Imagem que aparecerá como capa do post</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="types"
                    render={({ field }) => (
                      <FormItem>
                        <div>
                          <FormLabel className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-gray-400" />
                            Tipos
                          </FormLabel>
                          <FormDescription>
                            Selecione uma ou mais tipos para o seu imóvel
                          </FormDescription>
                        </div>

                        {isLoadingTypes ? (
                          <div className="flex items-center gap-2 text-gray-400 text-sm border rounded-md p-3">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Carregando tipos...
                          </div>
                        ) : (
                          <div className="max-h-60 overflow-y-auto pr-2 border rounded-md p-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {types?.map((categoria) => {
                                const isChecked = field.value?.includes(categoria.id);
                                return (
                                  <div key={categoria.id} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={categoria.id}
                                      checked={isChecked}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          field.onChange([...field.value, categoria.id]);
                                        } else {
                                          field.onChange(
                                            field.value.filter((val: string) => val !== categoria.id)
                                          );
                                        }
                                      }}
                                    />
                                    <FormLabel
                                      htmlFor={categoria.id}
                                      className="text-sm font-normal cursor-pointer hover:text-gray-700 transition-colors"
                                    >
                                      {categoria.name}
                                    </FormLabel>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="finalities"
                    render={({ field }) => (
                      <FormItem>
                        <div>
                          <FormLabel className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-gray-400" />
                            Finalidade
                          </FormLabel>
                          <FormDescription>
                            Selecione uma ou mais finalidades para o seu imóvel
                          </FormDescription>
                        </div>

                        {isLoadingFinalities ? (
                          <div className="flex items-center gap-2 text-gray-400 text-sm border rounded-md p-3">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Carregando finalidades...
                          </div>
                        ) : (
                          <div className="max-h-60 overflow-y-auto pr-2 border rounded-md p-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {finalities?.map((categoria) => {
                                const isChecked = field.value?.includes(categoria.id);
                                return (
                                  <div key={categoria.id} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={categoria.id}
                                      checked={isChecked}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          field.onChange([...field.value, categoria.id]);
                                        } else {
                                          field.onChange(
                                            field.value.filter((val: string) => val !== categoria.id)
                                          );
                                        }
                                      }}
                                    />
                                    <FormLabel
                                      htmlFor={categoria.id}
                                      className="text-sm font-normal cursor-pointer hover:text-gray-700 transition-colors"
                                    >
                                      {categoria.name}
                                    </FormLabel>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <div>
                          <FormLabel className="flex items-center gap-2">
                            Cidade
                          </FormLabel>
                        </div>

                        <Select
                          onValueChange={field.onChange}
                          value={field.value} // Use value em vez de defaultValue
                          disabled={isLoadingCities}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full cursor-pointer">
                              <div className="flex items-center gap-2">
                                {isLoadingCities ? (
                                  <span className="flex items-center gap-2 text-gray-400">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Carregando cidades...
                                  </span>
                                ) : (
                                  <>
                                    <MapPinHouse className="h-4 w-4 text-gray-400" />
                                    <SelectValue placeholder="Selecione a cidade" />
                                  </>
                                )}
                              </div>
                            </SelectTrigger>
                          </FormControl>

                          {!isLoadingCities && (
                            <SelectContent>
                              {cities?.map((city) => (
                                <SelectItem
                                  key={city.id}
                                  value={city.id}
                                  className="cursor-pointer"
                                >
                                  {city.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          )}
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="neighborhood"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <div>
                            <FormLabel className="flex items-center gap-2">
                              Bairro
                            </FormLabel>
                          </div>

                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={!selectedCity} // só habilita se tiver cidade
                          >
                            <FormControl>
                              <SelectTrigger className="w-full cursor-pointer">
                                <div className="flex items-center gap-2">
                                  <MapPinHouse className="h-4 w-4 text-gray-400" />
                                  <SelectValue placeholder="Selecione o bairro" />
                                </div>
                              </SelectTrigger>
                            </FormControl>

                            <SelectContent>
                              {selectedCity?.neighborhoods?.map((n) => (
                                <SelectItem
                                  key={n.id}
                                  value={n.id}
                                  className="cursor-pointer"
                                >
                                  {n.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" className="flex-1 cursor-pointer" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Atualizando...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Atualizar Imóvel
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
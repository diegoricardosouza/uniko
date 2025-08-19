/* eslint-disable @next/next/no-img-element */
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CategoryPosts } from "@/entities/CategoryPosts";
import { BookOpen, FileText, ImageIcon, Loader2, Save, Tag, Trash, Type } from "lucide-react";
import dynamic from "next/dynamic";
import { useEditBlogController } from "../edit/[id]/useEditBlogController";


// Importação dinâmica sem SSR
const TinyEditor = dynamic(() => import('../../_components/TinyEditor'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-md flex items-center justify-center gap-2">
    <Loader2 className="h-6 w-6 text-gray-500 animate-spin" />
    Carregando editor...
  </div>
})

interface FormNewPost {
  categorias: CategoryPosts[];
}

export function FormEditPost({ categorias }: FormNewPost) {
  const {
    form, 
    handleSubmit, 
    handleRemoveImage, 
    handleImageChange, 
    imagePreview, 
    isLoading,
    isDataLoaded
  } = useEditBlogController();

  // Aguarda os dados serem carregados antes de renderizar o formulário
  if (!isDataLoaded) {
    return (
      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-xl">Carregando...</CardTitle>
                <CardDescription>Carregando dados do post</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-gray-100 animate-pulse rounded-md flex items-center justify-center gap-2">
              <Loader2 className="h-6 w-6 text-gray-500 animate-spin" />
              Carregando dados...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-1">
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-xl">Editar Post</CardTitle>
              <CardDescription>Edite o artigo para o seu blog</CardDescription>
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título do Post</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Type className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input placeholder="Digite o título do seu post" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subtitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subtítulo</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Type className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input placeholder="Uma breve descrição do post" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-gray-400" />
                          Conteúdo do Post
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
                                    handleImageChange(file);
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
                    name="categories"
                    render={({ field }) => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-gray-400" />
                            Categorias
                          </FormLabel>
                          <FormDescription>
                            Selecione uma ou mais categorias para o seu post
                          </FormDescription>
                        </div>

                        <div className="max-h-60 overflow-y-auto pr-2 border rounded-md p-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {categorias?.map((categoria) => {
                              const catId = String(categoria.id);
                              const currentCategories = field.value || [];
                              const isChecked = currentCategories.includes(catId);
                              
                              return (
                                <div key={categoria.id} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={String(categoria.id)}
                                    checked={isChecked}
                                    onCheckedChange={(checked) => {
                                      const currentValue = field.value || [];
                                      if (checked) {
                                        field.onChange([...currentValue, catId]);
                                      } else {
                                        field.onChange(
                                          currentValue.filter((val) => val !== catId)
                                        );
                                      }
                                    }}
                                  />
                                  <FormLabel
                                    htmlFor={catId}
                                    className="text-sm font-normal cursor-pointer hover:text-gray-700 transition-colors"
                                  >
                                    {categoria.name}
                                  </FormLabel>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" className="cursor-pointer" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Atualizando...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Atualizar Post
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
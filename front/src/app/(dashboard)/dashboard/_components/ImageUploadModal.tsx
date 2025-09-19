/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client';

import { deleteMediaAction } from '@/app/actions/medias/delete-media';
import { getMediaAction } from '@/app/actions/medias/get-medias';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { localStoragekeys } from '@/config/localStorageKeys';
import { Medias } from '@/entities/Medias';
import { formatFileSize, getImageDimensions } from '@/lib/image';
import axios, { AxiosError, AxiosProgressEvent } from 'axios';
import { Check, Filter, Image, Plus, Search, Trash2, Upload, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertImage: (imageUrl: string) => void;
}

export const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  onInsertImage,
}) => {
  const [mediaLibrary, setMediaLibrary] = useState<Medias[]>([]);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const [uploadingImageId, setUploadingImageId] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [newUploadedImages, setNewUploadedImages] = useState<Medias[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageDetails, setSelectedImageDetails] = useState<Medias | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('upload');
  const [visibleItemsCount, setVisibleItemsCount] = useState(27);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const data = await getMediaAction();
        setMediaLibrary(data);
      } catch (error: any) {
        // Optionally handle error
        console.log(error);
        
        setMediaLibrary([]);
      }
    };
    fetchMedia();
  }, []);

  useEffect(() => {
    const fetchDimensions = async () => {
      if (selectedImageDetails?.url) {
        try {
          const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${selectedImageDetails.url}`;
          const dimensions = await getImageDimensions(fullUrl);
          setImageDimensions(dimensions);
        } catch (err) {
          console.error('Erro ao obter dimensões da imagem:', err);
          setImageDimensions(null);
        }
      }
    };

    fetchDimensions();
  }, [selectedImageDetails]);
  
  async function createMediaTinyClient(
    file: File,
    id?: string,
    onProgress?: (progressEvent: AxiosProgressEvent) => void
  ) {
    if (!file || !(file instanceof Blob)) {
      throw new Error('Arquivo inválido');
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('entityType', 'Post');
      formData.append('mediaType', 'attachment');
      const token = localStorage.getItem(localStoragekeys.TOKEN)

      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/medias`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          onUploadProgress: onProgress,
        }
      );

      return data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Erro detalhado:', error.response?.data);
        throw new Error(error.response?.data?.message || 'Erro de upload via Axios');
      }

      console.error('Erro inesperado:', error);
      throw new Error('Erro desconhecido ao subir a imagem');
    }
  }

  // Combinar imagens da biblioteca com as novas enviadas
  const allImages = [...newUploadedImages, ...mediaLibrary];

  // Filtrar imagens baseado na busca
  const filteredImages = allImages.filter((image: Medias) => {
    const matchesSearch = image.originalName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Imagens visíveis baseado na paginação
  const visibleImages = filteredImages.slice(0, visibleItemsCount);
  const hasMoreImages = filteredImages.length > visibleItemsCount;

  const handleLoadMore = () => {
    setVisibleItemsCount(prev => prev + 9);
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };
  
  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione apenas arquivos de imagem.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 5MB.");
      return;
    }
    
    try {
      const tempImageId = Date.now().toString();
      const tempImage: Medias = {
        id: tempImageId,
        url: URL.createObjectURL(file),
        originalName: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        createdAt: new Date().toISOString().split('T')[0],
        entityType: 'attachment',
        mediaType: file.type,
      };

      setNewUploadedImages(prev => [tempImage, ...prev]);
      setUploadingImageId(tempImageId);
      setIsUploading(true);
      setUploadProgress(0);
      setActiveTab('library');

      const uploadedImage = await createMediaTinyClient(file, undefined, (progressEvent: any) => {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(progress);
      });

      // Atualizar imagem com URL final
      setNewUploadedImages(prev =>
        prev.map(img =>
          img.id === tempImageId
            ? { ...img, ...uploadedImage, url: uploadedImage.url }
            : img
        )
      );

      setUploadingImageId(null);
      setIsUploading(false);
      setSelectedImage(`${process.env.NEXT_PUBLIC_API_URL}${uploadedImage.url}`);
      setSelectedImageDetails(uploadedImage);
      
      toast.success("Imagem enviada com sucesso!");
    } catch (error) {
      console.log(error);
      
      toast.error('Erro ao fazer upload da imagem.');
    }
  };

  const handleImageSelect = (image: Medias) => {
    if (selectedImage === `${process.env.NEXT_PUBLIC_API_URL}${image.url}`) {
      // Desselecionar se já está selecionada
      setSelectedImage(null);
      setSelectedImageDetails(null);
    } else {
      // Selecionar nova imagem
      setSelectedImage(`${process.env.NEXT_PUBLIC_API_URL}${image.url}`);
      setSelectedImageDetails(image);
    }
  };

  const handleInsertImage = () => {
    if (selectedImage) {
      onInsertImage(selectedImage);
      setSelectedImage(null);
      setSelectedImageDetails(null);
      onClose();
      toast.success('Imagem inserida no editor!');
    }
  };

  const handleRemoveImage = async (imageId: string) => {
    try {
      await deleteMediaAction(imageId);
      toast.success('Imagem excluida com sucesso!');

      // Remover do estado da mediaLibrary (vindo do servidor)
      setMediaLibrary((prev) => prev.filter((img) => img.id !== imageId));

      // Também remove das novas enviadas, se necessário
      setNewUploadedImages((prev) => prev.filter((img) => img.id !== imageId));

      if (selectedImageDetails?.id === imageId) {
        setSelectedImage(null);
        setSelectedImageDetails(null);
      }
    } catch (error) {
      console.log(error);
    }
    // setNewUploadedImages(prev => prev.filter(img => img.id !== imageId));
  };

  // Funções de drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      processFile(file);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    processFile(file);
  };

  const handleClose = () => {
    setSelectedImage(null);
    setSelectedImageDetails(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="!max-w-[90%] !max-h-[90vh] overflow-hidden">
        <div>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Image className="w-5 h-5" />
              Adicionar mídia
            </DialogTitle>
          </DialogHeader>

          <DialogDescription>
            Envie imagens para enriquecer seu conteúdo.
          </DialogDescription>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Enviar arquivos</TabsTrigger>
            <TabsTrigger value="library">Biblioteca de mídia</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="flex-1 mt-4">
            <div
              className={`border-2 border-dashed lg:min-h-[580px] flex items-center rounded-lg p-12 text-center transition-colors ${isDragOver ? 'border-primary bg-primary/5' : 'border-border'
                }`}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {isUploading ? (
                <div className="space-y-4 w-full">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-primary animate-pulse" />
                  </div>
                  <div className="space-y-3">
                    <p className="text-lg font-medium">Enviando arquivo...</p>
                    <Progress value={uploadProgress} className="w-full max-w-md mx-auto" />
                    <p className="text-sm text-muted-foreground">{uploadProgress}%</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 w-full">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold">Solte arquivos aqui para enviar</h3>
                    <p className="text-muted-foreground">ou</p>
                    <Button onClick={handleFileSelect} size="lg" className="bg-primary hover:bg-primary/90">
                      Selecionar arquivos
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Tamanho máximo de upload de arquivo: 5 MB.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent
            value="library"
            className="flex-1 mt-4 flex gap-6"
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {/* Main Content */}
            <div className={`flex-1 space-y-4 transition-colors ${isDragOver ? 'bg-primary/5 rounded-lg' : ''
              }`}>
              {/* Filters */}
              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filtrar mídia</span>
                </div>

                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Pesquisar mídia"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Image Grid */}
              <div className="grid lg:grid-cols-9 gap-3 max-h-[490px] overflow-y-auto p-1">
                {visibleImages.map((image) => (
                  <div
                    key={image.id}
                    className={`relative group cursor-pointer border-2 rounded-sm overflow-hidden transition-all aspect-square 
                      ${selectedImage === `${process.env.NEXT_PUBLIC_API_URL}${image.url}`
                        ? 'border-primary shadow-lg'
                        : 'border-border hover:border-primary/50'
                      }`}
                    onClick={() => handleImageSelect(image)}
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${image.url}`}
                      alt={image.originalName}
                      className="w-full h-full object-cover"
                    />

                    {/* Progresso do upload */}
                    {uploadingImageId === image.id && (
                      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-2">
                          <Upload className="w-6 h-6 text-white animate-pulse" />
                        </div>
                        <div className="w-3/4 bg-white/20 rounded-full h-1 overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-300" 
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <span className="text-white text-xs mt-1">{uploadProgress}%</span>
                      </div>
                    )}

                    {newUploadedImages.find(img => img.id === image.id) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage(image.id!);
                        }}
                        className="absolute top-1 right-1 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                    {selectedImage === `${process.env.NEXT_PUBLIC_API_URL}${image.url}` && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                          <Check />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {hasMoreImages && (
                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={handleLoadMore}
                    className="px-6"
                  >
                    Carregar mais
                  </Button>
                </div>
              )}

              <div className="text-xs text-muted-foreground text-center mt-[-8px]">
                Mostrando {visibleImages.length} de {filteredImages.length} {filteredImages.length === 1 ? 'item' : 'itens'}
              </div>
            </div>

            {/* Sidebar Details */}
              <div className="w-[300px] border-l pl-6 pr-6 space-y-4 min-h-[580px] max-h-[580px] overflow-y-auto">
                {selectedImageDetails && (
                  <>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">DETALHES DO ANEXO</h3>
                    </div>

                    <div className="space-y-4 pb-3">
                      <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${selectedImageDetails.url}`}
                        alt={selectedImageDetails.originalName}
                        className="w-full rounded-lg border"
                      />
                      <div className='flex'>
                        {newUploadedImages.find(img => img.id === selectedImageDetails.id) && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRemoveImage(selectedImageDetails.id!)}
                            className='w-full'
                          >
                            <Trash2 className="w-4 h-4" />
                            Deletar
                          </Button>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium">Nome do arquivo:</label>
                          <p className="text-sm text-muted-foreground">{selectedImageDetails.originalName}</p>
                        </div>

                        <div>
                          <label className="text-sm font-medium">Tipo de arquivo:</label>
                          <p className="text-sm text-muted-foreground">image/{selectedImageDetails.originalName?.split('.').pop()}</p>
                        </div>

                        <div>
                          <label className="text-sm font-medium">Data de upload:</label>
                          <p className="text-sm text-muted-foreground">
                            {selectedImageDetails.createdAt
                              ? new Date(selectedImageDetails.createdAt).toLocaleDateString('pt-BR')
                              : ''}
                          </p>
                        </div>

                        <div>
                          <label className="text-sm font-medium">Tamanho do arquivo:</label>
                        <p className="text-sm text-muted-foreground">
                          {selectedImageDetails.size
                            ? formatFileSize(typeof selectedImageDetails.size === 'number'
                                ? selectedImageDetails.size
                                : parseFloat(selectedImageDetails.size.replace(/[^\d.]/g, '')))
                            : ''}
                        </p>
                        </div>

                        <div>
                          <label className="text-sm font-medium">Dimensões:</label>
                          <p className="text-sm text-muted-foreground">
                            {imageDimensions
                            ? `${imageDimensions.width} por ${imageDimensions.height} pixels`
                            : 'Carregando...'}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Url do arquivo</label>
                        <Input 
                          placeholder="Descreva a finalidade da imagem..." 
                          value={`${process.env.NEXT_PUBLIC_API_URL}${selectedImageDetails.url}`} 
                          readOnly
                          className='mt-1'
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t mt-auto">
          <div className="text-sm text-muted-foreground">
            {selectedImageDetails ? (
              <span>1 item selecionado</span>
            ) : (
              'Selecione uma imagem para inserir'
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              onClick={handleInsertImage}
              disabled={!selectedImage}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4" />
              Inserir na página
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
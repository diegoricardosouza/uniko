/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCitiesAction } from "@/app/actions/cities/get-cities";
import { getFinalitiesAction } from "@/app/actions/finalities/get-finalities";
import { getPropertyAction } from "@/app/actions/properties/get-property";
import { updatePropertyAction } from "@/app/actions/properties/update-property";
import { getTypesAction } from "@/app/actions/types/get-types";
import { City } from "@/entities/City";
import { Finality } from "@/entities/Finality";
import { Type } from "@/entities/Type";
import { propertyUpdateSchema } from "@/schemas/propertyUpdateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { ImageGallery } from "../../../_components/Gallery";

type FormData = z.infer<typeof propertyUpdateSchema>

export function useEditPropertyController() {
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null | undefined>(null)
  const [types, setTypes] = useState<Type[] | null>([])
  const [isLoadingTypes, setIsLoadingTypes] = useState(false);
  const [finalities, setFinalities] = useState<Finality[] | null>([])
  const [isLoadingFinalities, setIsLoadingFinalities] = useState(false);
  const [cities, setCities] = useState<City[] | null>([])
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [zipcodeValid, setZipcodeValid] = useState('')
  const [gallery, setGallery] = useState<ImageGallery[]>([])
  const [existingGalleryFiles, setExistingGalleryFiles] = useState<
    { file: File; id?: string; name?: string }[]
  >([]);
  const route = useRouter();
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";

  const form = useForm<FormData>({
    resolver: zodResolver(propertyUpdateSchema),
    defaultValues: {
      title: "",
      description: "",
      reference: "",
      price: "",
      priceCondominium: "",
      priceIptu: "",
      delivery: "",
      totalArea: "",
      privateArea: "",
      bedrooms: "",
      bathrooms: "",
      parkingSpaces: "",
      zipCode: "",
      address: "",
      number: "",
      complement: "",
      city: "",
      neighborhood: "",
      featuredImage: undefined,
      types: [],
      finalities: [],
      characteristics: [],
      infrastructures: [],
      gallery: []
    },
  });

  const zipcode = form.watch("zipCode");
  const selectedCityId = form.watch("city");
  const selectedCity = cities?.find(city => city.id === selectedCityId);

  // NOVA FUNÇÃO: Converte URL de imagem para File
  const urlToFile = async (url: string, filename: string): Promise<File> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  };

  // NOVA FUNÇÃO: Carrega as imagens existentes como arquivos
  const loadExistingGalleryAsFiles = async (galleryImages: ImageGallery[]) => {
    try {
      const filePromises = galleryImages.map(async (image) => {
        const file = await urlToFile(image.url, image.name);
        return { file, id: image.id, name: image.name };
      });

      const files = await Promise.all(filePromises);
      setExistingGalleryFiles(files);
    } catch (error) {
      console.error("Erro ao converter imagens existentes para arquivos:", error);
      toast.error("Erro ao carregar imagens existentes");
    }
  };

  const removeExistingGalleryImage = (idOrName: string) => {
    // remove da galeria visual
    setGallery(prev => prev.filter(g => g.id !== idOrName && g.name !== idOrName));
    // remove do array de File que será enviado
    setExistingGalleryFiles(prev => prev.filter(f => f.id !== idOrName && f.name !== idOrName));
  };

  const removeNewGalleryImage = (index: number) => {
    const current = form.getValues("gallery") || [];
    current.splice(index, 1);
    form.setValue("gallery", current);
  };

  useEffect(() => {
    const fetchTypes = async () => {
      setIsLoadingTypes(true);
      try {
        const response = await getTypesAction();
        setTypes(response);
      } finally {
        setIsLoadingTypes(false);
      }
    }
    fetchTypes();
  }, [])

  useEffect(() => {
    const fetchFinalities = async () => {
      setIsLoadingFinalities(true);
      try {
        const response = await getFinalitiesAction();
        setFinalities(response);
      } finally {
        setIsLoadingFinalities(false);
      }
    }
    fetchFinalities();
  }, [])

  useEffect(() => {
    const fetchCities = async () => {
      setIsLoadingCities(true);
      try {
        const response = await getCitiesAction();
        setCities(response);
      } finally {
        setIsLoadingCities(false);
      }
    }
    fetchCities();
  }, [])

  // Chamada para ViaCEP
  useEffect(() => {
    if (zipcode) {
      form.setValue("address", "");
      form.setValue("neighborhood", "");
      form.setValue("number", "");
    }

    const fetchAddress = async (cep: string) => {
      setZipcodeValid("");
      if (cep?.length === 8) { // Formato completo do CEP
        try {
          const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
          if (!data.erro) {
            form.setValue("neighborhood", data.bairro);
            form.setValue("address", data?.logradouro);
          } else {
            setZipcodeValid("CEP inválido.");
          }
        } catch (error) {
          console.error("Erro ao buscar o endereço:", error);
        }
      }
    };

    fetchAddress(zipcode);
  }, [form, zipcode]);

  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      try {
        setIsDataLoaded(false);
        
        const property = await getPropertyAction(id);
        const featuredImagePost = property.medias?.filter((media) => media.mediaType === "featured_image")[0];
        const categoriesTypes = property.types
          ? property.types.map((cat: any) => String(cat.id))
          : [];
        const categoriesFinality = property.finalities
          ? property.finalities.map((cat: any) => String(cat.id))
          : [];
        const categoriesCharacteristics = property.characteristics
          ? property.characteristics.map((cat: any) => ({ name: cat.name }))
          : [];
        const categoriesInfrastructures = property.infrastructures
          ? property.infrastructures.map((cat: any) => ({ name: cat.name }))
          : [];
          
        form.setValue("title", property.title ?? "");
        form.setValue("description", property.description ?? "");
        form.setValue("reference", property.reference ?? "");
        form.setValue("price", property.price !== undefined && property.price !== null ? String(property.price) : "");
        form.setValue("priceCondominium", property.priceCondominium !== undefined && property.priceCondominium !== null ? String(property.priceCondominium) : "");
        form.setValue("priceIptu", property.priceIptu !== undefined && property.priceIptu !== null ? String(property.priceIptu) : "");
        form.setValue("delivery", property.delivery ?? "");
        form.setValue("totalArea", property.totalArea !== undefined && property.totalArea !== null ? String(property.totalArea) : "");
        form.setValue("privateArea", property.privateArea !== undefined && property.privateArea !== null ? String(property.privateArea) : "");
        form.setValue("bedrooms", property.bedrooms !== undefined && property.bedrooms !== null ? String(property.bedrooms) : "");
        form.setValue("bathrooms", property.bathrooms !== undefined && property.bathrooms !== null ? String(property.bathrooms) : "");
        form.setValue("parkingSpaces", property.parkingSpaces !== undefined && property.parkingSpaces !== null ? String(property.parkingSpaces) : "");
        form.setValue("zipCode", property.zipCode ?? "");
        form.setValue("address", property.address ?? "");
        form.setValue("number", property.number?.toString() ?? "");
        form.setValue("complement", property.complement ?? "");
        form.setValue("featuredImage", featuredImagePost?.url);
        form.setValue("types", categoriesTypes);
        form.setValue("finalities", categoriesFinality);
        if (property.city?.id) {
          form.setValue("city", property.city.id);

          // Aguardar um tick para garantir que a cidade foi processada
          setTimeout(() => {
            if (property.neighborhood?.id) {
              form.setValue("neighborhood", property.neighborhood.id);
            }
          }, 0);
        }
        form.setValue("characteristics", categoriesCharacteristics);
        form.setValue("infrastructures", categoriesInfrastructures);
        setImagePreview(`${featuredImagePost?.url ? process.env.NEXT_PUBLIC_API_URL : ''}${featuredImagePost?.url ?? ""}`);
        const gallery = property.medias?.filter((media) => media.mediaType === "gallery");

        const imgsGallery = gallery?.map(m => ({
          id: m.id!,
          name: m.originalName!,
          size: Number(m.size),
          type: m.mediaType,
          url: `${process.env.NEXT_PUBLIC_API_URL}${m.url}`
        }))
        setGallery(imgsGallery ?? []);

        // NOVO: Carrega as imagens existentes como arquivos
        if (imgsGallery && imgsGallery.length > 0) {
          await loadExistingGalleryAsFiles(imgsGallery);
        }
        
        setIsDataLoaded(true);
      } catch (error: any) {
        console.log(error);
        toast.error("Erro ao buscar dados do imovel");
      }
    };

    fetchProperty();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, form, cities]);

  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "characteristics",
  });
  const { fields: fieldsInfra, append: appendInfra, remove: removeInfra } = useFieldArray({
    control,
    name: "infrastructures",
  });

  // Função para lidar com seleção de nova imagem
  function handleImageChange(file: File) {
    setSelectedFile(file);

    // Criar preview da nova imagem
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    form.setValue("featuredImage", file);
  }
    
  function handleRemoveImage() {
    setImagePreview('');
    setSelectedFile(null);
    form.setValue("featuredImage", undefined);
  }

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("reference", data.reference);
      formData.append("price", data.price.toString());
      formData.append("cityId", data.city);
      formData.append("neighborhoodId", data.neighborhood);
      formData.append("typeIds", JSON.stringify(data.types));
      formData.append("finalityIds", JSON.stringify(data.finalities));
      if (data.description) formData.append("description", data.description);
      if (data.priceCondominium) formData.append("priceCondominium", data.priceCondominium.toString());
      if (data.priceIptu) formData.append("priceIptu", data.priceIptu.toString());
      if (data.delivery) formData.append("delivery", data.delivery);
      if (data.totalArea) formData.append("totalArea", data.totalArea.toString());
      if (data.privateArea) formData.append("privateArea", data.privateArea.toString());
      if (data.bedrooms) formData.append("bedrooms", data.bedrooms.toString());
      if (data.bathrooms) formData.append("bathrooms", data.bathrooms.toString());
      if (data.parkingSpaces) formData.append("parkingSpaces", data.parkingSpaces.toString());
      if (data.address) formData.append("address", data.address);
      if (data.number) formData.append("number", data.number);
      if (data.complement) formData.append("complement", data.complement);
      if (data.zipCode) formData.append("zipCode", data.zipCode);
      if (data.featuredImage) formData.append("featuredImage", data.featuredImage);
      
      // // MODIFICADO: Combina imagens existentes + novas imagens
      const allGalleryFiles: File[] = [];

      // // Adiciona as imagens existentes primeiro
      existingGalleryFiles.forEach(item => {
        if (item?.file instanceof File) allGalleryFiles.push(item.file);
      });

      // novas: data.gallery pode ser [{file: File, ...}, ...] ou [File, ...]
      if (data.gallery && data.gallery.length > 0) {
        data.gallery.forEach((item: any) => {
          if (item?.file instanceof File) allGalleryFiles.push(item.file);
          else if (item instanceof File) allGalleryFiles.push(item);
        });
      }

      // append todos os arquivos ao FormData (use file.name para preservar nome)
      allGalleryFiles.forEach((file, idx) => {
        formData.append("gallery", file, file.name ?? `gallery-${idx}`);
      });

      console.log(allGalleryFiles);
      

      // if (data.gallery && data.gallery.length > 0) {
      //   data.gallery.forEach((file: any) => {
      //     formData.append("gallery", file.file);
      //   });
      // }

      if (data.characteristics) {
        formData.append("characteristic", JSON.stringify(data.characteristics));
      }
      if (data.infrastructures) {
        formData.append("infrastructure", JSON.stringify(data.infrastructures));
      }

      console.log('formdata', formData);

      await updatePropertyAction(id, formData);

      toast.success("Imóvel atualizado com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao atualizar o imóvel");
    } finally {
      setIsLoading(false);
    }
  });

  return {
    form,
    isLoading,
    imagePreview,
    handleSubmit,
    handleRemoveImage,
    setImagePreview,
    handleImageChange,
    isDataLoaded,
    types,
    finalities,
    cities,
    zipcodeValid,
    selectedCity,
    isLoadingCities,
    isLoadingFinalities,
    isLoadingTypes,
    fields,
    fieldsInfra,
    gallery,
    existingGalleryFiles,
    appendInfra,
    removeInfra,
    append,
    remove,
    removeExistingGalleryImage,
    removeNewGalleryImage
  }
}
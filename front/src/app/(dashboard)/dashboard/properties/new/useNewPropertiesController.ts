
"use client";
import { getCitiesAction } from "@/app/actions/cities/get-cities";
import { getFinalitiesAction } from "@/app/actions/finalities/get-finalities";
import { createPropertyAction } from "@/app/actions/properties/create-property";
import { getTypesAction } from "@/app/actions/types/get-types";
import { City } from "@/entities/City";
import { Finality } from "@/entities/Finality";
import { Type } from "@/entities/Type";
import { propertyCreateSchema } from "@/schemas/propertyCreateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type FormData = z.infer<typeof propertyCreateSchema>

export function useNewPropertiesController() {
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [types, setTypes] = useState<Type[] | null>([])
  const [isLoadingTypes, setIsLoadingTypes] = useState(false);
  const [finalities, setFinalities] = useState<Finality[] | null>([])
  const [isLoadingFinalities, setIsLoadingFinalities] = useState(false);
  const [cities, setCities] = useState<City[] | null>([])
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [zipcodeValid, setZipcodeValid] = useState('')
  const route = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(propertyCreateSchema),
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
  })
  const zipcode = form.watch("zipCode");
  const selectedCityId = form.watch("city");
  const selectedCity = cities?.find(city => city.id === selectedCityId);

  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "characteristics",
  });
  const { fields: fieldsInfra, append: appendInfra, remove: removeInfra } = useFieldArray({
    control,
    name: "infrastructures",
  });

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

  function handleRemoveImage() {
    setImagePreview('');
    form.setValue("featuredImage", undefined);
  }

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      
      await createPropertyAction({
        ...data,
        price: Number(data.price),
        priceCondominium: Number(data.priceCondominium),
        priceIptu: Number(data.priceIptu),
        totalArea: Number(data.totalArea),
        privateArea: Number(data.privateArea),
        bedrooms: Number(data.bedrooms),
        bathrooms: Number(data.bathrooms),
        parkingSpaces: Number(data.parkingSpaces),
        typeIds: data.types,
        finalityIds: data.finalities,
        cityId: data.city,
        neighborhoodId: data.neighborhood,
        characteristic: data.characteristics?.map((p) => p.name),
        infrastructure: data.infrastructures?.map((p) => p.name),
        gallery: data.gallery || []
      });
      
      toast.success("Imóvel cadastrado com sucesso!");
      route.push('/dashboard/properties');
    } catch (error) {
      console.log('error', error);
      toast.error("Erro ao cadastrar o imóvel");
    } finally {
      setIsLoading(false)
    }
  })

  return {
    form,
    isLoading,
    imagePreview,
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
    appendInfra,
    removeInfra,
    append,
    remove,
    handleSubmit,
    handleRemoveImage,
    setImagePreview
  }
}
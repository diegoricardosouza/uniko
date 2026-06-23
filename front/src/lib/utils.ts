import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const prices = [
  {
    value: "all",
    label: "Selecione",
  },
  {
    value: "ate-40000",
    label: "Até 40 mil",
  },
  {
    value: "40000-60000",
    label: "De 40 mil a 60 mil",
  },
  {
    value: "60000-80000",
    label: "De 60 mil a 80 mil",
  },
  {
    value: "80000-200000",
    label: "De 80 mil a 200 mil",
  },
  {
    value: "200000-400000",
    label: "De 200 mil a 400 mil",
  },
  {
    value: "400000-600000",
    label: "De 400 mil a 600 mil",
  },
  {
    value: "600000-800000",
    label: "De 600 mil a 800 mil",
  },
  {
    value: "800000-1000000",
    label: "De 800 mil a 1 milhão",
  },
  {
    value: "1000000-2000000",
    label: "De 1 milhão a 2 milhões",
  },
  {
    value: "2000000-4000000",
    label: "De 2 milhões a 4 milhões",
  },
  {
    value: "4000000-6000000",
    label: "De 4 milhões a 6 milhões",
  },
  {
    value: "acima-6000000",
    label: "Acima de 6 milhões",
  },
];

export const bedrooms = [
  {
    value: "all",
    label: "Selecione",
  },
  {
    value: "1",
    label: "1 Quarto",
  },
  {
    value: "2",
    label: "2 Quartos",
  },
  {
    value: "3",
    label: "3 Quartos",
  },
  {
    value: "4",
    label: "4 Quartos",
  },
  {
    value: "5",
    label: "5 Quartos",
  },
  {
    value: "acima-5",
    label: "Acima de 5 Quartos",
  }
];

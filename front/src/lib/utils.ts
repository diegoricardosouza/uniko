import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const prices = [
  {
    value: "ate-40000",
    label: "Até 40.000,00",
  },
  {
    value: "40000-60000",
    label: "De 40.000,00 a 60.000,00",
  },
  {
    value: "60000-80000",
    label: "De 60.000,00 a 80.000,00",
  },
  {
    value: "80000-200000",
    label: "De 80.000,00 a 200.000,00",
  },
  {
    value: "200000-400000",
    label: "De 200.000,00 a 400.000,00",
  },
  {
    value: "400000-600000",
    label: "De 400.000,00 a 600.000,00",
  },
  {
    value: "600000-800000",
    label: "De 600.000,00 a 800.000,00",
  },
  {
    value: "800000-1000000",
    label: "De 800.000,00 a 1.000.000,00",
  },
  {
    value: "1000000-2000000",
    label: "De 1.000.000,00 a 2.000.000,00",
  },
  {
    value: "2000000-4000000",
    label: "De 2.000.000,00 a 4.000.000,00",
  },
  {
    value: "4000000-6000000",
    label: "De 4.000.000,00 a 6.000.000,00",
  },
  {
    value: "acima-6000000",
    label: "Acima de 6.000.000,00",
  },
];

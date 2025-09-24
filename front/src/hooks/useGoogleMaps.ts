/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export const useGoogleMaps = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Se o Google Maps já está carregado
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    // Se já foi marcado como carregado globalmente
    if ((window as any).googleMapsLoaded) {
      setIsLoaded(true);
      return;
    }

    // Inicializa o array de callbacks se não existir
    if (!(window as any).googleMapsCallbacks) {
      (window as any).googleMapsCallbacks = [];
    }

    // Adiciona callback para quando carregar
    const callback = () => {
      setIsLoaded(true);
    };
    (window as any).googleMapsCallbacks.push(callback);

    // Se já existe um script sendo carregado, apenas aguarda
    const existingScript = document.querySelector('#google-maps-script');
    if (existingScript) {
      return;
    }

    // Cria função global de callback
    (window as any).initGoogleMaps = () => {
      (window as any).googleMapsLoaded = true;
      (window as any).googleMapsCallbacks?.forEach((cb: () => void) => cb());
      (window as any).googleMapsCallbacks = [];
    };

    // Carrega o script apenas uma vez
    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initGoogleMaps`;
    script.async = true;
    script.defer = true;

    script.onerror = () => {
      setError('Erro ao carregar Google Maps API');
      console.error('Erro ao carregar Google Maps API');
    };

    document.head.appendChild(script);

    // Cleanup: remove apenas o callback específico
    return () => {
      if ((window as any).googleMapsCallbacks) {
        const index = (window as any).googleMapsCallbacks.indexOf(callback);
        if (index > -1) {
          (window as any).googleMapsCallbacks.splice(index, 1);
        }
      }
    };
  }, []);

  return { isLoaded, error };
};
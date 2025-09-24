/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGoogleMaps } from '@/hooks/useGoogleMaps';
import { useEffect, useRef, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import { LuArrowRight } from 'react-icons/lu';

interface GoogleMapsProps {
  address: string; // Endereço no formato: "Rua Comendador Araújo, 510 Lj 06 - Centro, Curitiba - PR"
  businessName?: string;
  phone1?: string;
  phone2?: string;
  hours?: string;
  className?: string;
}

// Declare o tipo global para Google Maps
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export function GoogleMaps({
  address,
  businessName,
  phone1,
  phone2,
  hours,
  className
}: GoogleMapsProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const { isLoaded, error } = useGoogleMaps();
  const [currentPosition, setCurrentPosition] = useState<{ lat: number, lng: number } | null>(null);
  const whats = phone2?.replace(/\D/g, '');

  // Função para fazer parsing do endereço
  const parseAddress = (fullAddress: string) => {
    try {
      // Remove CEP do endereço (formato: 12345-123 ou 12345123)
      const cleanAddress = fullAddress.replace(/\s*\d{5}-?\d{3}\s*/g, ' ').trim();

      // Exemplo: "Rua Comendador Araújo, 510 Lj 06 - Centro, Curitiba - PR"
      const parts = cleanAddress.split(' - ');

      if (parts.length >= 3) {
        // Primeira parte: "Rua Comendador Araújo, 510 Lj 06"
        const streetAndNumber = parts[0].trim();
        // Segunda parte: "Centro"
        const neighborhood = parts[1].trim();
        // Terceira parte: "Curitiba"
        const city = parts[2].trim();
        // Quarta parte: "PR" (se existir)
        const state = parts[3]?.trim() || '';

        return {
          streetAndNumber,
          neighborhood,
          city,
          state,
          formatted: cleanAddress
        };
      }

      // Fallback se o formato for diferente
      return {
        streetAndNumber: cleanAddress,
        neighborhood: '',
        city: '',
        state: '',
        formatted: cleanAddress
      };
    } catch (error) {
      console.error('Erro ao fazer parsing do endereço:', error);
      return {
        streetAndNumber: fullAddress,
        neighborhood: '',
        city: '',
        state: '',
        formatted: fullAddress
      };
    }
  };

  const parsedAddress = parseAddress(address);

  // Obtém a posição atual do usuário
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log("Erro ao obter localização:", error);
        }
      );
    }
  }, []);

  // Inicializa o mapa
  useEffect(() => {
    if (isLoaded && mapRef.current) {
      initializeMap();
    }
  }, [isLoaded, address]);

  const initializeMap = async () => {
    if (!window.google || !mapRef.current) return;

    const geocoder = new window.google.maps.Geocoder();

    try {
      const results = await geocodeAddress(geocoder, address);
      const location = results[0].geometry.location;

      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 15,
        center: location,
        styles: [
          // Estilo personalizado do mapa (opcional)
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      });

      // Marker do estabelecimento
      const marker = new window.google.maps.Marker({
        position: location,
        map: map,
        title: businessName
      });

      // Info Window
      const infoWindow = new window.google.maps.InfoWindow({
        content: createInfoWindowContent()
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

    } catch (error) {
      console.error('Erro ao geocodificar endereço:', error);
    }
  };

  const geocodeAddress = (geocoder: any, address: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address: address }, (results: any, status: any) => {
        if (status === 'OK') {
          resolve(results);
        } else {
          reject(status);
        }
      });
    });
  };

  const createInfoWindowContent = () => {
    return `
      <div style="max-width: 250px; font-family: Montserrat, sans-serif; color: #343434;">
        <h3 style="margin: 0 0 8px 0; color: #C5AF62; font-size: 16px; font-weight: 600;">${businessName}</h3>
        <p style="margin: 4px 0; font-size: 14px; line-height: 1.4;">
          ${address}
        </p>
        ${phone1 ? `<p style="margin: 4px 0; font-size: 14px;"><strong>Tel:</strong> ${phone1}</p>` : ''}
        ${phone2 ? `<p style="margin: 4px 0; font-size: 14px;"><strong>Tel:</strong> ${phone2}</p>` : ''}
        <p style="margin: 4px 0; font-size: 14px;"><strong>Horário:</strong> ${hours}</p>
      </div>
    `;
  };

  const handleDirections = () => {
    const destination = encodeURIComponent(address);
    let url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;

    if (currentPosition) {
      url += `&origin=${currentPosition.lat},${currentPosition.lng}`;
    }

    window.open(url, '_blank');
  };

  return (
    <div className="md:flex gap-[30px] relative">
      <div className='w-full max-w-[380px] rounded-[20px_20px_20px_0] bg-bggray py-8 md:py-10 px-4 md:px-8 mb-5 md:mb-0'>
        <h2
          className='title-card-contato'
          dangerouslySetInnerHTML={{ __html: businessName ?? "" }}
        />

        <address
          className='text-center font-montserrat text-[16px] md:text-[18px] font-medium leading-[20px] md:leading-[22px] text-title'
        >
          {parsedAddress.streetAndNumber.replace('<br>', '')}
          {parsedAddress.neighborhood && (
            <p>
              {parsedAddress.neighborhood}
              {parsedAddress.city && ` - ${parsedAddress.city}`}
              {parsedAddress.state && ` - ${parsedAddress.state}`}
            </p>
          )}
        </address>

        <div className='fone-card-items'>
          <span>
            {phone1}<br />
            {phone2}
          </span>
        </div>

        <p
          className='text-center font-montserrat text-[16px] md:text-[18px] font-medium leading-[20px] md:leading-[22px] text-title mb-[30px]'
        >
          {hours}
        </p>

        <div className='flex gap-[7px] md:gap-[15px] justify-between'>
          <a
            href={`https://wa.me/55${whats}`}
            target="_blank"
            rel="noopener noreferrer"
            className="button-geral !text-gold md:!text-[13px] md:!px-4 md:!gap-[5px] hover:!bg-gold hover:!text-white"
          >
            <FaWhatsapp className="w-[15px] h-[15px] lg:w-[18px] lg:h-[18px]" />
            FALE CONOSCO
          </a>

          <button
            onClick={handleDirections}
            className="button-geral !px-4 md:!text-[13px] !text-gold hover:!bg-gold hover:!text-white"
          >
            SEGUIR ROTA
            <LuArrowRight className="w-[13px] h-[13px] md:w-[16px] md:h-[16px] ml-[-3px]" />
          </button>
        </div>
      </div>

      <div className='flex-1'>
        {/* Mapa */}
        <div
          ref={mapRef}
          className={className}
          style={{ minHeight: '330px' }}
        />

        {!isLoaded && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
            <div className="text-gray-500">Carregando mapa...</div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
            <div className="text-red-500">Erro ao carregar o mapa: {error}</div>
          </div>
        )}
      </div>
    </div>
  );
}
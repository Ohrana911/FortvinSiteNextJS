'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { DaDataSuggestion, DaDataAddress } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface AdressInputProps {
  onChange?: (value?: string) => void;
}

// Загружаем AddressSuggestions только на клиенте
const AddressSuggestionsClient = dynamic(
  () => import('react-dadata').then((mod) => mod.AddressSuggestions),
  { ssr: false }
);

export const AdressInput: React.FC<AdressInputProps> = ({ onChange }) => {
  return (
    <AddressSuggestionsClient
      token="270b4d26a7ce41a9344303ab8d0416c4511eaa79"
      onChange={(data: DaDataSuggestion<DaDataAddress> | undefined) =>
        onChange?.(data?.value)
      }
    />
  );
};

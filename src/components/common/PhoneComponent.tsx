'use client';

import React from 'react';
import CopyComponent from './CopyComponent';

interface PhoneComponentProps {
  phoneNumber: string | number;
}

const PhoneComponent = ({ phoneNumber }: PhoneComponentProps) => {
  return (
    <CopyComponent value={phoneNumber}>
      <a
        href={`tel:${phoneNumber}`}
        className="font-semibold text-blue-600 hover:underline"
      >
        {phoneNumber}
      </a>
    </CopyComponent>
  );
};

export default PhoneComponent;

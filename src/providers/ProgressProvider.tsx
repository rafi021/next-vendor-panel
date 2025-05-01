'use client';
import React from 'react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProgressProvider = () => {
  return (
    <ProgressBar
      height="3px"
      color="#002266"
      options={{ showSpinner: true }}
      shallowRouting
    />
  );
};

export default ProgressProvider;

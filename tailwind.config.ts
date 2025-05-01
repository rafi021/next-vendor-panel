import type { Config } from 'tailwindcss';
import { appConfig } from './app.config';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    fontSize: {
      xl: ['24px', { lineHeight: '32px' }],
      lg: ['20px', { lineHeight: '28px' }],
      md: ['16px', { lineHeight: '24px' }],
      sm: ['14px', { lineHeight: '20px' }],
      xs: ['12px', { lineHeight: '18px' }],
    },
    extend: {
      colors: appConfig.themes.colors,
      spacing: appConfig.themes.spacing,
      borderRadius: appConfig.themes.borderRadius,
      backgroundImage: appConfig.themes.backgroundImage,

      borderColor: {
        DEFAULT: '#D5D7DA',
        secondary: '#E9EAEB',
      },
      transitionProperty: {
        height: 'height',
        maxHeight: 'maxHeight',
        minHeight: 'minHeight',
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'bounce-down': 'bounce-down 10s',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;

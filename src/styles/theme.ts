import { Roboto } from 'next/font/google';
import { type PaletteOptions, createTheme, css } from '@mui/material/styles';

export type AllowedTheme = NonNullable<PaletteOptions['mode']>;

export const DEFAULT_THEME: AllowedTheme = 'dark';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export const lightTheme = createTheme({
  palette: {
    primary: { main: 'rgba(255, 255, 255, 0.5)' },
    secondary: { main: '#2a48f3' },
    mode: 'light',
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: { main: '#EEE' },
    secondary: { main: '#2a48f3' },
    mode: 'dark',
  },
});

export const globalStyles = css`
  :root {
    body {
      background-color: #6c757d;
      color: #121212;
    }
  }
  [data-theme='dark'] {
    body {
      background-color: #1d2123;
      color: #fff;
    }
  }
`;

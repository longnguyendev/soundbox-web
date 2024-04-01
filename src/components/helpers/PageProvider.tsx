import createEmotionCache from '@/createEmotionCache';
import { CacheProvider, type EmotionCache } from '@emotion/react';
import { ThemeProvider as PreferredThemeProvider } from 'next-themes';
import Head from 'next/head';
import { type FC } from 'react';
import MUIThemeProvider from './MUIThemeProvider';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface PageProviderProps {
  emotionCache?: EmotionCache;
  children: React.ReactNode;
}

const PageProvider: FC<PageProviderProps> = ({
  children,
  emotionCache = clientSideEmotionCache,
}) => (
  <PreferredThemeProvider defaultTheme="dark">
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <MUIThemeProvider>{children}</MUIThemeProvider>
    </CacheProvider>
  </PreferredThemeProvider>
);

export default PageProvider;

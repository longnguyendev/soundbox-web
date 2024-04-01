import { type AppProps } from 'next/app';
import { type EmotionCache } from '@emotion/react';
import createEmotionCache from '@/createEmotionCache';
import PageProvider from '@/components/helpers/PageProvider';
import { type NextPage } from 'next';
import { type ReactElement, type ReactNode } from 'react';
import { AudioProvider } from '@/hooks/useAudio';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export type NextPageWithLayout<P = Record<string, unknown>> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export type AppPropsWithLayout = MyAppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp(props: AppPropsWithLayout) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <PageProvider emotionCache={emotionCache}>
      <AudioProvider>{getLayout(<Component {...pageProps} />)}</AudioProvider>
    </PageProvider>
  );
}

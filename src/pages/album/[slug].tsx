import React from 'react';
import { type NextPageWithLayout } from '../_app';
import { Layout } from '@/layouts';
import { Box, Container, Typography, Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { AlbumItem } from '@/components';
import { type Song } from '@/lib/model';
import { BASE_URL, getAlbum, getAlbums } from '@/lib/utils';
import { useAlbumQuery } from '@/hooks';
import { type GetStaticPropsContext } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';

const AlbumsDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const {
    query: { slug },
  } = router;

  const { data: album } = useAlbumQuery(String(slug));

  return (
    <Box
      minHeight="100vh"
      sx={{
        background: `linear-gradient(180deg, rgba(29, 33, 35, 0.8) 0%, #1D2123 61.48%), url(${BASE_URL}${
          album?.thumbnail ?? ''
        })`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container
        sx={{
          pt: '20px',
        }}
      >
        <Box display="flex" alignItems="center" mb={'50px'}>
          <Box
            sx={{
              aspectRatio: '1',
              backgroundImage: `url(${BASE_URL}${album?.thumbnail ?? ''})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
            }}
            borderRadius="35px"
            overflow="hidden"
            width="284px"
            mr="14px"
          />
          <Box>
            <Typography
              fontSize="35px"
              fontWeight="700"
              mb="8px"
              color="#A4C7C6"
            >
              {album?.name}
            </Typography>
            <Typography mb="8px" color="#EFEEE0" fontSize="20px">
              {album?.description}
            </Typography>
            <Typography fontSize="14px" color="#999">
              {album?.totalsong} {' bài hát'}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Stack spacing="20px">
            {album?.songs?.map((song: Song) => (
              <AlbumItem key={song.id} song={song} />
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

AlbumsDetailPage.getLayout = (page) => <Layout>{page}</Layout>;

export default AlbumsDetailPage;

export async function getStaticPaths() {
  const data = await getAlbums();

  const paths = data.map((album) => {
    return { params: { slug: album.slug } };
  });
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const queryClient = new QueryClient();
  const slug = context.params?.slug ?? '';
  await queryClient.prefetchQuery({
    queryKey: ['getAlbum'],
    queryFn: () => getAlbum(String(slug)),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

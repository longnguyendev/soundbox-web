import React, { useEffect, useState } from 'react';
import { type NextPageWithLayout } from '../_app';
import { Layout } from '@/layouts';
import { Box, Container, Typography, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import { AlbumItem } from '@/components';
import { type Song, type Album } from '@/model';

const getAlbum = async ({
  slug,
  setAlbum,
}: {
  slug: string;
  setAlbum: (data: Album) => void;
}) => {
  const { data } = await axios.get<Album>(
    `http://localhost:8000/api/albums/${slug}`
  );
  setAlbum(data);
};

const AlbumsDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const {
    query: { slug },
  } = router;

  const [album, setAlbum] = useState<Album>();

  useEffect(() => {
    if (slug) {
      void getAlbum({ slug: slug as string, setAlbum });
    }
  }, [slug]);

  if (!album) {
    return null;
  }
  return (
    <Box
      minHeight="100vh"
      sx={{
        background: `linear-gradient(180deg, rgba(29, 33, 35, 0.8) 0%, #1D2123 61.48%), url(http://localhost:8000/storage/thumbnails/${album.thumbnail})`,
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
              backgroundImage: `url(http://localhost:8000/storage/thumbnails/${album.thumbnail})`,
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
              {album.name}
            </Typography>
            <Typography mb="8px" color="#EFEEE0" fontSize="20px">
              {album.description}
            </Typography>
            <Typography fontSize="14px" color="#999">
              {album.totalsong} {' bài hát'}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Stack spacing="20px">
            {album.songs?.map((song: Song) => (
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

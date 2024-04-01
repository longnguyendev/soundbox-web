import { Grid, Stack } from '@mui/material';

import { type NextPageWithLayout } from './_app';
import { Layout } from '@/layouts';

import axios from 'axios';
import { useEffect, useState } from 'react';

// import Cookies from 'js-cookie';

import { type Album, type Category } from '@/model';
import { Collection, HomeSlider, AlbumsCard } from '@/components';

const getAlbums = async (setAlbums: (data: Album[]) => void) => {
  const { data } = await axios.get<Album[]>('http://localhost:8000/api/albums');
  setAlbums(data);
};

const getCategories = async (setCategories: (data: Category[]) => void) => {
  const { data } = await axios.get<Category[]>(
    'http://localhost:8000/api/categories'
  );
  setCategories(data);
};

const Home: NextPageWithLayout = () => {
  const [categories, setCategories] = useState<Category[]>();
  const [albums, setAlbums] = useState<Album[]>([]);
  useEffect(() => {
    void getAlbums(setAlbums);
    void getCategories(setCategories);
  }, []);
  return (
    <>
      <Grid container spacing={2} mb="34px" columns={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={1} sm={1} md={2}>
          <HomeSlider />
        </Grid>
        <Grid item xs={1} sm={1} md={1}>
          <Stack
            spacing="12px"
            height={'400px'}
            overflow={'auto'}
            sx={{
              '::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            {albums?.map((album) => (
              <AlbumsCard
                key={album.id}
                thumbnail={`http://localhost:8000/storage/thumbnails/${album.thumbnail}`}
                name={album.name}
                description={album.description}
                slug={album.slug}
              />
            ))}
          </Stack>
        </Grid>
      </Grid>
      {categories?.map((category) => (
        <Collection
          key={category.id}
          name={category.name}
          items={category.songs}
        />
      ))}
    </>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;

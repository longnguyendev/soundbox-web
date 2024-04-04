import { Grid, Stack } from '@mui/material';

import { type NextPageWithLayout } from './_app';
import { Layout } from '@/layouts';

// import Cookies from 'js-cookie';

import { Collection, HomeSlider, AlbumsCard } from '@/components';
import { BASE_URL, getAlbums, getCategories } from '@/lib/utils';
import { type Album, type Category } from '@/lib/model';
import { type GetStaticPropsContext } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { useAlbumsQuery, useCategoriesQuery } from '@/hooks';

interface HomePageProps {
  albums: Album[];
  categories: Category[];
}

const Home: NextPageWithLayout<HomePageProps> = () => {
  const { data: categories } = useCategoriesQuery();
  const { data: albums } = useAlbumsQuery();

  return (
    <>
      <Grid container spacing={2} mb="34px" columns={{ xs: 1, sm: 1, md: 3 }}>
        <Grid item xs={1} sm={1} md={2}>
          <HomeSlider />
        </Grid>
        <Grid item xs={1} sm={1} md={1}>
          <Stack
            spacing="12px"
            height={'430px'}
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
                thumbnail={`${BASE_URL}${album.thumbnail}`}
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

export async function getStaticProps(context: GetStaticPropsContext) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['getCategories'],
    queryFn: () => getCategories(),
  });
  await queryClient.prefetchQuery({
    queryKey: ['getAlbums'],
    queryFn: () => getAlbums(),
  });
  // const categories = await getCategories().then(({ data }) => data);
  // const albums = await getAlbums().then(({ data }) => data);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

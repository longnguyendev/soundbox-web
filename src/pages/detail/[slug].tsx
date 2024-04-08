import React, { useEffect, useState } from 'react';
import { type NextPageWithLayout } from '../_app';
import { Layout } from '@/layouts';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { Comments } from '@/components';
import { type GetStaticPropsContext } from 'next';
import { BASE_URL, addComment, getSong, getSongs } from '@/lib/utils';
import Cookies from 'js-cookie';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { useSongQuery } from '@/hooks';

const SongDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const {
    query: { slug },
  } = router;

  const { data: song, refetch } = useSongQuery(String(slug));

  const [content, setContent] = useState('');

  useEffect(() => {
    if (slug) {
      void refetch();
    }
  }, [refetch, slug]);

  if (!song) {
    return null;
  }
  return (
    <>
      <Box
        sx={{
          background: `linear-gradient(180deg, rgba(29, 33, 35, 0.8) 0%, #1D2123 61.48%), url(${BASE_URL}${song.thumbnail})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          borderRadius: '24px',
        }}
      >
        <Container
          sx={{
            py: '20px',
          }}
        >
          <Box display="flex" alignItems="center">
            <Box
              sx={{
                aspectRatio: '1',
                backgroundImage: `url(${BASE_URL}${song.thumbnail})`,
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
                {song.name}
              </Typography>
              <Typography mb="8px" color="#EFEEE0" fontSize="14px">
                {song.singers.map((singer) => singer.name).join(', ')}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
      <Typography mt="150px" mb="50px">
        Bình Luận
      </Typography>
      <TextField
        fullWidth
        label="Add your comment"
        variant="filled"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={() => {
          void (Cookies.get('access_token')
            ? addComment(content, song.id).then((_res) => {
                setContent('');
                refetch().catch((_err) => {});
              })
            : router.push('/login'));
        }}
      >
        Gửi Bình Luận
      </Button>
      <Comments comments={song.comments} />
    </>
  );
};

SongDetailPage.getLayout = (page) => <Layout>{page}</Layout>;

export default SongDetailPage;

export async function getStaticPaths() {
  const data = await getSongs();

  const paths = data.map((song) => {
    return { params: { slug: song.slug } };
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
    queryKey: ['getSong', slug],
    queryFn: () => getSong(String(slug)),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

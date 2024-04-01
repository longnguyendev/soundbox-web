import React, { useEffect, useState } from 'react';
import { type NextPageWithLayout } from '../_app';
import { Layout } from '@/layouts';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { type Song } from '@/model';
import { Comments } from '@/components';

const getSong = async ({
  slug,
  setSong,
}: {
  slug: string;
  setSong: (data: Song) => void;
}) => {
  const { data } = await axios.get<Song>(
    `http://localhost:8000/api/songs/${slug}`
  );
  setSong(data);
  console.log(data);
};

const addComment = async ({
  content,
  songId,
  onSuccess,
}: {
  content: string;
  songId: number;
  onSuccess: () => void;
}) => {
  const ACCESS_TOKEN = Cookies.get('access_token');
  if (ACCESS_TOKEN) {
    axios
      .post(
        'http://localhost:8000/api/comments',
        { content, songId },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      )
      .then(() => {
        onSuccess();
      })
      .catch((_err) => {});
  }
};

const SongDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const {
    query: { slug },
  } = router;

  const [song, setSong] = useState<Song>();
  const [content, setContent] = useState('');
  useEffect(() => {
    if (slug) {
      void getSong({ slug: slug as string, setSong });
    }
  }, [slug]);

  if (!song) {
    return null;
  }
  return (
    <>
      <Box
        sx={{
          background: `linear-gradient(180deg, rgba(29, 33, 35, 0.8) 0%, #1D2123 61.48%), url(http://localhost:8000/storage/thumbnails/${song.thumbnail})`,
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
          <Box display="flex" alignItems="center">
            <Box
              sx={{
                aspectRatio: '1',
                backgroundImage: `url(http://localhost:8000/storage/thumbnails/${song.thumbnail})`,
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
                {song.singers.map((singer: any) => singer.name).join(', ')}
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
        variant="filled"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <Button
        variant="contained"
        onClick={() => {
          void (Cookies.get('access_token')
            ? addComment({
                content,
                songId: song.id,
                onSuccess: () => {
                  void getSong({ slug: slug as string, setSong });
                  setContent('');
                },
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

import { Layout } from '@/layouts';
import { type NextPageWithLayout } from '../_app';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { type Song } from '@/model';
import { AlbumItem } from '@/components';

const getSongs = async ({
  keyword,
  setSongs,
}: {
  keyword: string;
  setSongs: (data: Song[]) => void;
}) => {
  const { data } = await axios.get<Song[]>(
    `http://localhost:8000/api/search/${keyword}`
  );
  setSongs(data);
  console.log(data);
};

const SearchPage: NextPageWithLayout = () => {
  const router = useRouter();
  const {
    query: { keyword },
  } = router;
  const [songs, setSongs] = useState<Song[]>();
  useEffect(() => {
    if (keyword) {
      void getSongs({ keyword: keyword as string, setSongs });
    }
  }, [keyword]);
  return (
    <>
      <Box>
        <Typography fontSize={'30px'} mb={'50px'}>
          Kết Quả Tìm Kiếm cho: {keyword}
        </Typography>
        <Stack spacing="20px">
          {songs?.map((song) => (
            <AlbumItem key={song.id} song={song} />
          ))}
        </Stack>
      </Box>
    </>
  );
};

SearchPage.getLayout = (page) => <Layout>{page}</Layout>;

export default SearchPage;

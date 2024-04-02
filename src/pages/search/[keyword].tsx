import { Layout } from '@/layouts';
import { type NextPageWithLayout } from '../_app';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { type Song } from '@/lib/model';
import { AlbumItem } from '@/components';
import { BASE_URL } from '@/lib/utils';

const getSongs = async ({
  keyword,
  setSongs,
}: {
  keyword: string;
  setSongs: (data: Song[]) => void;
}) => {
  const { data } = await axios.get<Song[]>(`${BASE_URL}api/search/${keyword}`);
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

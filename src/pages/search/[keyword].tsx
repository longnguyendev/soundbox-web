import { Layout } from '@/layouts';
import { type NextPageWithLayout } from '../_app';
import { useRouter } from 'next/router';
import { Box, Stack, Typography } from '@mui/material';
import { AlbumItem } from '@/components';
import { useSearchQuery } from '@/hooks';

const SearchPage: NextPageWithLayout = () => {
  const router = useRouter();

  const {
    query: { keyword },
  } = router;

  const { data: songs } = useSearchQuery(String(keyword));

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

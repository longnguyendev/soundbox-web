import { type FC } from 'react';

import {
  Box,
  type BoxProps,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { FavoriteBorder } from '@mui/icons-material';

import Link from './Link';
import { useAudio } from '@/hooks/useAudio';
import { useHorizontalScroll } from '@/hooks';
import { type Song } from '@/lib/model';
import { BASE_URL } from '@/lib/utils';

interface AlbumItemProps extends BoxProps {
  song: Song;
}

const AlbumItem: FC<AlbumItemProps> = ({ song, ...props }) => {
  const { setUrl } = useAudio();
  const ref = useHorizontalScroll();
  return (
    <Box
      {...props}
      onClick={() => {
        setUrl(`${BASE_URL}${song.file_path}`);
      }}
    >
      <Stack
        ref={ref}
        display={'flex'}
        direction="row"
        justifyContent={'space-between'}
        alignItems={'center'}
        spacing={2}
        borderRadius={'15px'}
        p={'10px'}
        sx={{
          backgroundColor: 'rgba(51, 55, 59, 0.37)',
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Box display="flex" alignItems={'center'}>
          <Box
            sx={{
              width: '42px',
              aspectRatio: '1',
              backgroundImage: `url(${BASE_URL}${song.thumbnail})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
            }}
            overflow="hidden"
            flexShrink="0"
            mr="12px"
            borderRadius={'10px'}
          />
          <IconButton
            sx={{ ml: 'auto', border: '1px solid rgba(255, 255, 255, 0.11)' }}
          >
            <FavoriteBorder
              sx={{
                color: '#FACD66',
              }}
            />
          </IconButton>
        </Box>
        <Typography
          component={Link}
          href={`/detail/${song.slug}`}
          sx={{ textDecoration: 'none' }}
        >
          {song.name}
        </Typography>
        <Typography>
          {' '}
          {song.singers?.map((singer) => singer.name).join(', ')}
        </Typography>
        <Typography>
          {String(Math.floor(song.total_time / 60)) +
            ':' +
            String(song.total_time % 60)}
        </Typography>
      </Stack>
    </Box>
  );
};
export { AlbumItem };

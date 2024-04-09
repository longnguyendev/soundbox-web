import React, { type FC } from 'react';

import Link from './Link';

import { Box, type BoxProps, Typography } from '@mui/material';

import { type Song } from '@/lib/model';
import { BASE_URL } from '@/lib/utils';

interface CardProps extends BoxProps {
  song: Song;
}

const SongCard: FC<CardProps> = ({ song, onClick, ...props }) => {
  return (
    <Box {...props}>
      <Box
        sx={{
          aspectRatio: '1',
          backgroundImage: `url(${BASE_URL}${song.thumbnail})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          cursor: 'pointer',
        }}
        borderRadius="25px"
        overflow="hidden"
        mb="5px"
        onClick={onClick}
      />
      <Box
        component={Link}
        href={`/detail/${song.slug}`}
        sx={{ textDecoration: 'none' }}
      >
        <Typography
          fontSize="15px"
          color="white"
          mb="5px"
          height="40px"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitLineClamp: 2,
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {song.name}
        </Typography>
        <Typography
          fontSize="12px"
          sx={(theme) => ({
            color: theme.palette.mode === 'dark' ? '#FACD66' : '#000',
          })}
        >
          {song.singers.map((singer: any) => singer.name).join(', ')}
        </Typography>
      </Box>
    </Box>
  );
};

export { SongCard };

// interface Theme {
//   mode: string;
// }

// type Sx = string | ((theme: Theme) => string);

// interface TestProps {
//   sx: Sx;
// }

// export const Test = ({ sx }: TestProps) => {
//   const theme: Theme = { mode: 'light' };

//   const newSx = typeof sx === 'string' ? sx : sx(theme);

//   return <div className={newSx}>hehe</div>;
// };

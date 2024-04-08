import React, { type FC } from 'react';

import Link from './Link';

import { Box, type BoxProps, Typography } from '@mui/material';

import { type Song } from '@/lib/model';
import { BASE_URL } from '@/lib/utils';
import { useTheme } from 'next-themes';

interface CardProps extends BoxProps {
  song: Song;
}

const SongCard: FC<CardProps> = ({ song, onClick, ...props }) => {
  const { resolvedTheme } = useTheme();
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
        <Typography fontSize="15px" color="white" mb="5px">
          {song.name}
        </Typography>
        <Typography
          fontSize="12px"
          color={resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : '#000'}
        >
          {song.singers.map((singer: any) => singer.name).join(', ')}
        </Typography>
      </Box>
    </Box>
  );
};

export { SongCard };

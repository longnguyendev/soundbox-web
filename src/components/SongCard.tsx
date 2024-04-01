import React, { type FC } from 'react';

import Link from './Link';

import { Box, type BoxProps, Typography } from '@mui/material';

import { type Song } from '@/model';

interface CardProps extends BoxProps {
  song: Song;
}

const SongCard: FC<CardProps> = ({ song, onClick, ...props }) => {
  return (
    <Box {...props}>
      <Box
        sx={{
          aspectRatio: '1',
          backgroundImage: `url(http://localhost:8000/storage/thumbnails/${song.thumbnail})`,
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
        <Typography fontSize="12px" color="rgba(255, 255, 255, 0.5)">
          {song.singers.map((singer: any) => singer.name).join(', ')}
        </Typography>
      </Box>
    </Box>
  );
};

export { SongCard };

import { Box, IconButton, Typography } from '@mui/material';
import React, { type FC } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Link from './Link';
import { useTheme } from 'next-themes';

interface TopCardProps {
  thumbnail: string;
  name: string;
  description: string;
  slug: string;
}

const AlbumsCard: FC<TopCardProps> = ({
  thumbnail,
  name,
  description,
  slug,
}) => {
  const { resolvedTheme } = useTheme();
  return (
    <Box
      display="flex"
      alignItems="center"
      borderRadius="20px"
      bgcolor={resolvedTheme === 'dark' ? '#1A1E1F' : '#343a40'}
      p="16px"
      component={Link}
      href={`/album/${slug}`}
      sx={{ textDecoration: 'none' }}
    >
      <Box
        sx={{
          aspectRatio: '1',
          backgroundImage: `url(${thumbnail})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
        borderRadius="10px"
        overflow="hidden"
        width="63px"
        mr="14px"
        flexShrink="0"
      />
      <Box>
        <Typography fontSize="20px" mb="4px">
          {name}
        </Typography>
        <Typography fontSize="13px" mb="4px">
          {description.substring(0, 20)}...
        </Typography>
      </Box>
      <IconButton
        sx={{ ml: 'auto', border: '1px solid rgba(255, 255, 255, 0.11)' }}
      >
        <FavoriteBorderIcon
          sx={{
            color: '#FACD66',
          }}
        />
      </IconButton>
    </Box>
  );
};

export { AlbumsCard };

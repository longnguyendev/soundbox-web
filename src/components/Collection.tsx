import { Box, Stack, Typography } from '@mui/material';
import React, { type FC } from 'react';
import { useHorizontalScroll } from '@/hooks';
import { useAudio } from '@/hooks/useAudio';
import { type Song } from '@/model';
import { SongCard } from '@/components';

interface CollectionProps {
  name: string;
  items: Song[];
}

const Collection: FC<CollectionProps> = ({ name, items }) => {
  const ref = useHorizontalScroll();
  const { setUrl } = useAudio();
  return (
    <Box>
      <Typography fontSize="24px" fontWeight="700" mb="12px">
        {name}
      </Typography>
      <Box
        ref={ref}
        overflow="auto"
        sx={{
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Stack direction="row" spacing="30px">
          {items.map((item) => (
            <SongCard
              key={item.id}
              song={item}
              width="150px"
              flexShrink="0"
              onClick={() => {
                setUrl(
                  `http://localhost:8000/storage/filePath/${item.file_path}`
                );
              }}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export { Collection };

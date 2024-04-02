import { PrimarySearchAppBar, BottomBar, SideBar } from '@/components';
import { useAudio } from '@/hooks/useAudio';
import { Box, Container } from '@mui/material';
import React, { type FC, type PropsWithChildren } from 'react';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { url } = useAudio();

  return (
    <Box minHeight="100vh">
      <PrimarySearchAppBar />
      <SideBar />
      <Container sx={{ pt: '80px', pb: '200px' }}>{children}</Container>
      {url && <BottomBar />}
    </Box>
  );
};

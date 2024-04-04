import Logout from '@/assets/icons/Logout';
import PlayList from '@/assets/icons/PlayList';
import Profile from '@/assets/icons/Profile';
import Radio from '@/assets/icons/Radio';
import Video from '@/assets/icons/Video';
import { Home } from '@mui/icons-material';
import { Avatar, Box, IconButton, Stack } from '@mui/material';
import React from 'react';
import Link from 'next/link';
import router from 'next/router';
import { BASE_URL, logout } from '@/lib/utils';
import { useUserQuery } from '@/hooks';

export const SideBar = () => {
  const { data: user } = useUserQuery();

  return (
    <Box
      display="flex"
      flexDirection="column"
      position="fixed"
      top="90px"
      left="25px"
    >
      <Stack
        bgcolor="#1A1E1F"
        borderRadius="32px"
        py="25px"
        px="15px"
        spacing="20px"
        mb="20px"
      >
        <IconButton LinkComponent={Link} href="/">
          <Home />
        </IconButton>
        <IconButton>
          <PlayList />
        </IconButton>
        <IconButton>
          <Radio />
        </IconButton>
        <IconButton>
          <Video />
        </IconButton>
      </Stack>
      <Stack
        bgcolor="#1A1E1F"
        borderRadius="32px"
        py="25px"
        px="15px"
        spacing="20px"
        alignItems="center"
      >
        {user ? (
          <Avatar
            alt="Remy Sharp"
            src={`${BASE_URL}${user.avatar}`}
            sx={{ width: 30, height: 30 }}
          />
        ) : (
          <IconButton LinkComponent={Link} href="/login">
            <Profile />
          </IconButton>
        )}

        {user && (
          <IconButton
            onClick={() => {
              void logout().then((_res) => {
                document.cookie =
                  'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                void router.push('/login');
              });
            }}
          >
            <Logout />
          </IconButton>
        )}
      </Stack>
    </Box>
  );
};

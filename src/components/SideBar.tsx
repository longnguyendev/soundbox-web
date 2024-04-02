import Logout from '@/assets/icons/Logout';
import PlayList from '@/assets/icons/PlayList';
import Profile from '@/assets/icons/Profile';
import Radio from '@/assets/icons/Radio';
import Video from '@/assets/icons/Video';
import { Home } from '@mui/icons-material';
import { Avatar, Box, IconButton, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import axios from 'axios';
import router from 'next/router';
import { type User } from '@/lib/model';
import { BASE_URL } from '@/lib/utils';

const getUser = async (
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
) => {
  const ACCESS_TOKEN = Cookies.get('access_token') as string;
  const { data } = await axios.get<User>(`${BASE_URL}api/user`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  setUser(data);
};

export const SideBar = () => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    if (Cookies.get('access_token')) {
      void getUser(setUser);
    }
  }, []);
  const logout = async () => {
    const ACCESS_TOKEN = Cookies.get('access_token');
    axios
      .post(
        `${BASE_URL}api/auth/logout`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN as string}`,
          },
        }
      )
      .then(() => {
        document.cookie =
          'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        void router.push('/login');
      })
      .catch((_err) => {});
  };

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
              void logout();
            }}
          >
            <Logout />
          </IconButton>
        )}
      </Stack>
    </Box>
  );
};

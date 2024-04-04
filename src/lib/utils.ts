import axios from 'axios';
import Cookies from 'js-cookie';
import {
  type Song,
  type Album,
  type Category,
  type User,
  type LoginInput,
  type NewUser,
  type AuthData,
} from './model';
import { toast } from 'react-toastify';

export const BASE_URL = 'http://128.199.245.172:8000/';

export const http = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  // headers: {
  //   'Content-Type': 'application/json',
  //   Accept: 'application/json',
  //   Authorization: `Bearer ${ACCESS_TOKEN}`,
  // },
});

export const getCategories = async () => {
  const result = await http
    .get<Category[]>('api/categories')
    .then(({ data }) => data);
  return result;
};

export const getAlbums = async () => {
  const result = await http.get<Album[]>('api/albums').then(({ data }) => data);
  return result;
};

export const getAlbum = async (slug: string) => {
  const result = await http
    .get<Album>(`api/albums/${slug}`)
    .then(({ data }) => data);
  return result;
};

export const getSongs = () => {
  const result = http.get<Song[]>('api/songs').then(({ data }) => data);
  return result;
};

export const getSong = async (slug: string) => {
  const result = await http
    .get<Song>(`api/songs/${slug}`)
    .then(({ data }) => data);
  return result;
};

export const getUser = async () => {
  const ACCESS_TOKEN = Cookies.get('access_token') ?? '';
  const result = await http
    .get<User>('api/user', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    })
    .then(({ data }) => data);
  return result;
};

export const addComment = (content: string, songId: number) => {
  return http.post<Song[]>('api/comments', { content, songId });
};

export const searchSongs = async (keyword: string) => {
  const result = await http
    .get<Song[]>(`api/search/${keyword}`)
    .then(({ data }) => data);
  return result;
};

export const login = async (loginInput: LoginInput) => {
  const result = await http
    .post<AuthData>(
      'api/auth/login',
      {
        email: loginInput.email,
        password: loginInput.password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )
    .then(({ data }) => data)
    .catch((_err) => {
      toast.error('Đăng nhập không thành công', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    });
  return result;
};

export const signup = async (loginInput: NewUser) => {
  const result = await http
    .post<AuthData>(
      'api/users',
      {
        email: loginInput.email,
        password: loginInput.password,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      }
    )
    .then(({ data }) => data)
    .catch((_err) => {
      toast.error('Đăng kí không thành công', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    });
  return result;
};

export const logout = async () => {
  const ACCESS_TOKEN = Cookies.get('access_token') ?? '';
  await http
    .post('api/auth/logout', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    })
    .then((_res) => {})
    .catch((_err) => {});
};

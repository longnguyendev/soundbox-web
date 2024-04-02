import axios from 'axios';
import Cookies from 'js-cookie';
import { type Song, type Album, type Category } from './model';

export const BASE_URL = 'http://128.199.245.172:8000/';

const ACCESS_TOKEN = Cookies.get('access_token') as string;

export const http = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN || ''}`,
  },
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

export const getSongs = () => {
  return http.get<Song[]>('api/songs');
};

export const addComment = (content: string, songId: number) => {
  return http.post<Song[]>('api/comments', { content, songId });
};

export const getSongDetail = async (slug: string) => {
  const result = await http
    .get<Song>(`api/songs/${slug}`)
    .then(({ data }) => data);
  return result;
};

//   const { data: categories } = useQuery({
//     queryKey: ['categories'],
//     queryFn: getCategories,
//     select({ data }) {
//       return data;
//     },
//   });

// const { data: albums } = useQuery({
//   queryKey: ['albums'],
//   queryFn: getAlbums,
//   select({ data }) {
//     return data;
//   },
// });

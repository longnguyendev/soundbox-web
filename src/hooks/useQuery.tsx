import {
  getAlbum,
  getAlbums,
  getCategories,
  getSong,
  getUser,
  searchSongs,
} from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ['getCategories'],
    queryFn: getCategories,
  });
};

export const useAlbumsQuery = () => {
  return useQuery({
    queryKey: ['getAlbums'],
    queryFn: getAlbums,
  });
};

export const useAlbumQuery = (slug: string) => {
  return useQuery({
    queryKey: ['getAlbum', slug],
    queryFn: () => getAlbum(slug),
  });
};

export const useSearchQuery = (keyword: string) => {
  return useQuery({
    queryKey: ['searchSongs', keyword],
    queryFn: () => searchSongs(keyword),
  });
};

export const useSongQuery = (slug: string) => {
  return useQuery({
    queryKey: ['getSong', slug],
    queryFn: () => getSong(slug),
  });
};

export const useUserQuery = () => {
  return useQuery({
    queryKey: ['getUser'],
    queryFn: getUser,
  });
};

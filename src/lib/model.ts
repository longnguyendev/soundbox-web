export interface Song {
  id: number;
  name: string;
  slug: string;
  file_path: string;
  total_time: number;
  thumbnail: string;
  listens: string;
  packet: string;
  singers: Singer[];
  categories: Category;
  comments: Comment[];
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  gender: string;
}

export interface Singer {
  singer_id: number;
  name: string;
}

export interface Comment {
  id: number;
  user: User;
  content: string;
}
export interface Category {
  id: number;
  name: string;
  category_id: number;
  songs: Song[];
}
export interface Album {
  id: number;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  songs: Song[];
  totalsong: number;
  singers: Singer[];
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface NewUser extends Omit<User, 'id'> {
  password: string;
}

export interface AuthData {
  access_token: string;
}

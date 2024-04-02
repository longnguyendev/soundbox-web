import { BASE_URL } from '@/lib/utils';
import axios from 'axios';
import Cookies from 'js-cookie';
import router from 'next/router';

export default function Sigout() {
  const ACCESS_TOKEN = Cookies.get('access_token') as string;
  const logout = async () => {
    try {
      void axios
        .post(
          `${BASE_URL}api/auth/logout`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        )
        .then(() => {});
    } catch (err) {
      console.log(err);
    }

    document.cookie =
      'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    void router.push('/login');
  };
  void logout();
}

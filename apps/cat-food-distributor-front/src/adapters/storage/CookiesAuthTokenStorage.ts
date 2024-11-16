import { IAuthTokenStorage } from '@cat-food-distributor/store-react';
import { getTokenFromCookies, removeTokenFromCookies, setTokenIntoCookies } from '../../services/authToken';

export class CookiesAuthTokenStorage implements IAuthTokenStorage {
  setToken(token: string) {
    setTokenIntoCookies(token);
  }

  getToken() {
    return getTokenFromCookies();
  }

  removeToken() {
    removeTokenFromCookies()
  }
}

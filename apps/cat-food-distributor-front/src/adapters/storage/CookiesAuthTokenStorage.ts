import { IAuthTokenStorage } from '@cat-food-distributor/store-react';
import { getTokenFromCookies, setTokenIntoCookies } from '../../services/authToken';

export class CookiesAuthTokenStorage implements IAuthTokenStorage {
  setToken(token: string) {
    setTokenIntoCookies(token);
  }

  getToken() {
    return getTokenFromCookies();
  }

  removeToken() {
    this.setToken('');
  }
}

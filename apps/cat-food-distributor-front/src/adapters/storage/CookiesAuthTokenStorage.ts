import { IAuthTokenStorage } from '@cat-food-distributor/shared/auth/data-access';
import { getTokenFromCookies, removeTokenFromCookies, setTokenIntoCookies } from '../../services/authToken';

export class CookiesAuthTokenStorage implements IAuthTokenStorage {
  async setToken(token: string) {
    await setTokenIntoCookies(token);
  }

  getToken() {
    return getTokenFromCookies();
  }

  async removeToken() {
    await removeTokenFromCookies()
  }
}

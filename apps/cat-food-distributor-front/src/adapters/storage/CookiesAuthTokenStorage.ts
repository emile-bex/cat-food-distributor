import { getTokenFromCookies, setTokenIntoCookies } from '../../services/authToken';
import { IAuthTokenStorage } from '../../use-cases/auth/IAuthTokenStorage';

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

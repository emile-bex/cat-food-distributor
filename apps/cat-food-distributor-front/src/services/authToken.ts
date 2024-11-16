import { Cookies } from '../utils/types/Cookies';
import { getCookie, setCookie, deleteCookie} from 'cookies-next/client';

export function getTokenFromCookies(): string | null {
  return getCookie(Cookies.AUTH_TOKEN) || null
}

export function setTokenIntoCookies(authToken: string): void {
  setCookie(Cookies.AUTH_TOKEN, authToken)
}

export function removeTokenFromCookies(): void {
  deleteCookie(Cookies.AUTH_TOKEN)
}

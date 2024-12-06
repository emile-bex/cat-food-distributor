import { Cookies } from '@cat-food-distributor/shared/util/types';
import { getCookie, setCookie, deleteCookie} from 'cookies-next';

export async function getTokenFromCookies(): Promise<string | null> {
  const token = await getCookie(Cookies.AUTH_TOKEN);
  return token || null;
}

export async function setTokenIntoCookies(authToken: string): Promise<void> {
  await setCookie(Cookies.AUTH_TOKEN, authToken)
}

export async function removeTokenFromCookies(): Promise<void> {
  await deleteCookie(Cookies.AUTH_TOKEN)
}

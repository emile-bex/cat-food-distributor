import { Api } from "@cat-food-distributor/shared/data-access/api";
import { getTokenFromCookies } from './authToken';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export function getApiInstance() {
  return Api.getInstance(baseURL, getTokenFromCookies)
}

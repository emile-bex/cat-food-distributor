import { Api as ApiClass } from "@cat-food-distributor/api";
import { getTokenFromCookies } from './authToken';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const Api = new ApiClass(baseURL, getTokenFromCookies);

export const Cookies = {
  AUTH_TOKEN: 'auth_token'
} as const;

export type Cookie = typeof Cookies[keyof typeof Cookies]

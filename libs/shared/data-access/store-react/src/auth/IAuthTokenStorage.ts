export interface IAuthTokenStorage {
  getToken(): string | null;
  setToken(token: string): void;
  removeToken(): void;
}

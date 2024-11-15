import { AuthDependencies } from './auth/auth.saga';

export type AppDependencies = AuthDependencies

export type PartialAppDependencies = Partial<AppDependencies>;

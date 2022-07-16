import { post, del } from './requests.service';

export const login = (username, password) => post('/auth/login', { username, password });

export const logout = (refreshToken) => del('/auth/logout', { refreshToken: refreshToken });
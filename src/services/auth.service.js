import { post, del } from './requests.service';

export const login = (username, password) => post('/auth/login', { username, password });

export const signup = (userData) => post('/auth/signup', userData);

export const logout = (refreshToken) => del('/auth/logout', { refreshToken: refreshToken });

export const newTokens = (refreshToken) => post('/auth/token', { refreshToken: refreshToken });
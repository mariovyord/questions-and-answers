import { post } from './requests.service';

export const login = (username, password) => post('/auth/login', { username, password });
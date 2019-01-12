import { environment } from '../../../environments/environment';

export const configs = {
  apiUrl: environment.production ? '/api' : 'http://localhost:3000/api'
};

export const apiPaths = {
  login: '/auth/login',
  registration: '/auth/registration',
  confirmation: '/auth/confirmation',
  resend: '/auth/send',
  update: '/auth/update',
  getUser: '/auth/getUser'
};

export const routerPaths = {
  login: '/auth/login',
  signup: '/auth/registration',
  home: '/home'
};

import { environment } from '../../../environments/environment';

export const configs = {
  apiUrl: environment.production ? '/api' : 'http://localhost:3000/api'
};

export const apiPaths = {
  home: '',
  login: '/auth/login',
  registration: '/auth/registration',
  confirmation: '/auth/confirmation',
  resend: '/auth/send',
  update: '/auth/update',
  getUser: '/auth/getUser',
  reset: '/auth/reset',
  resetConfirmation: '/auth/resetConfirmation',
  createMovie: '/movie/create'
};

export const routerPaths = {
  login: '/auth/login',
  signup: '/auth/registration',
  reset: '/auth/reset',

  home: '/home',
};

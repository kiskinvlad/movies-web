import { environment } from '../../../environments/environment';

export const configs = {
  apiUrl: environment.production ? '/api' : 'http://localhost:3000/api'
};

export const apiPaths = {
  login: '/login',
  registration: '/registration'
};

export const routerPaths = {
  login: '/auth/login',
  signup: '/auth/registration',
  home: '/home'
};

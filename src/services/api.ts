import _axios from 'axios';

export const apitodo = _axios.create({
  baseURL: 'https://final-project-back-end-i-production.up.railway.app',
});

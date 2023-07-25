import _axios from 'axios';

export const apitodo = _axios.create({
  baseURL: 'http://localhost:8080',
});

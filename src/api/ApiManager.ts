import axios from 'axios';

const ApiManager = axios.create({
  baseURL: 'https://service.ssm.devcontour.ru/api',
  responseType: 'json',
  withCredentials: true,
});

export default ApiManager;

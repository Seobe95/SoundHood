import axios from 'axios';
import Config from 'react-native-config';

const apiInstance = axios.create({
  baseURL: Config.API_URI,
  withCredentials: true,
});

export { apiInstance };

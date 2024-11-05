import axios from 'axios';
import Config from 'react-native-config';

const apiInstance = axios.create({
  baseURL: Config.API_URI,
  withCredentials: true,
});

const spotifyIntance = axios.create({
  baseURL: 'https://api.spotify.com/v1/search',
  withCredentials: true,
});

export { apiInstance, spotifyIntance };

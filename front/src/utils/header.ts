import { apiInstance } from '../api/axios';

function setHeader(key: string, value: string) {
  apiInstance.defaults.headers.common[key] = value;
}

function removeHeader(key: string) {
  if (!apiInstance.defaults.headers.common[key]) {
    return;
  }

  delete apiInstance.defaults.headers.common[key];
}

export { setHeader, removeHeader };

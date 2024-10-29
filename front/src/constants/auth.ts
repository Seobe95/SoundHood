const authNavigations = {
  LOGIN: 'Login',
  REGISTER: 'Register',
  AUTH_HOME: 'AuthHome',
} as const;

const authToken = {
  ACCESS_TOKEN: 'AccessToken',
  REFRESH_TOKEN: 'RefreshToken',
} as const;

export { authNavigations, authToken };

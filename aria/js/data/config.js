const IS_LOCALHOST = ['localhost', '127.0.0.1'].includes(window.location.hostname);

export const CONFIG = {
  BACKEND_URL: IS_LOCALHOST
    ? 'http://127.0.0.1:8000'
    : 'https://echo-wsu5.onrender.com'
};

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY) || null;
};

export const setAccessToken = (token: string | null) => {
  if (token) {
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
  } else {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  }
};

const API_URL = process.env.NODE_ENV === 'production'
  ? process.env.NEXT_PUBLIC_URL_PRODUCTION
  : process.env.NEXT_PUBLIC_URL_LOCAL;

export default API_URL;
export const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5004/api/v1";

export const API_ENDPOINTS = {
  STATS: `${BASE_URL}/stats`,
  BLOOD_GROUP: `${BASE_URL}/blood-group`,
  USERS: `${BASE_URL}/users`,
};

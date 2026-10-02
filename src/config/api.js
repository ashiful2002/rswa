const rawBaseUrl =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_BASE_URL ||
  "http://localhost:5004/api/v1";

const cleanUrl = rawBaseUrl.replace(/\/+$/, "");

export const BASE_URL = cleanUrl.endsWith("/api/v1")
  ? cleanUrl
  : `${cleanUrl}/api/v1`;

export const API_ENDPOINTS = {
  STATS: `${BASE_URL}/stats`,
  BLOOD_GROUP: `${BASE_URL}/blood-group`,
  USERS: `${BASE_URL}/users`,
  PROJECTS: `${BASE_URL}/projects`,
  STUDENT_AWARD: `${BASE_URL}/student-award`,
  COMMITTEE: `${BASE_URL}/committee`,
};

import axios from "axios";

const apiClient=axios.create({
  baseURL:"https://chaitanya-ai.vercel.app/api",
  timeout:5000,
});

export default apiClient;
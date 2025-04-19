import axios from "axios";

const AUTH_SERVICE_BASE_URL = import.meta.env.VITE_AUTH_SERVICE_URL;

export const login = (username, password) =>
    axios.post(`${AUTH_SERVICE_BASE_URL}/login`, { username, password }).then(res => res.data);
import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8082/auth";

export const login = (username, password) =>
    axios.post(`${REST_API_BASE_URL}/login`, { username, password }).then(res => res.data);
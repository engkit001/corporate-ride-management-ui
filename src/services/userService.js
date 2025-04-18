import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8082/users"; 

// Function to get the list of users
export const listUsers = () => {
    const token = localStorage.getItem("token");
    const url = `${REST_API_BASE_URL}`;
    return axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const registerUser = ({ username, password, role }) => {
    const token = localStorage.getItem("token");
    const url = `${REST_API_BASE_URL}/register`;
    return axios.post(url, 
        {
            username,
            password,
            role,
        }, 
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
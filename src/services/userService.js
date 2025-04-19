import axios from "axios";

const USER_SERVICE_BASE_URL = import.meta.env.VITE_USER_SERVICE_URL;

// Function to get the list of users
export const listUsers = () => {
    const token = localStorage.getItem("token");
    const url = `${USER_SERVICE_BASE_URL}`;
    return axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const registerUser = ({ username, password, role }) => {
    const token = localStorage.getItem("token");
    const url = `${USER_SERVICE_BASE_URL}/register`;
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
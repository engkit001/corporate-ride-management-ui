import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8081/drivers"; // Base URL for the driver service

// Function to get the list of drivers
export const listDrivers = () => {
    const token = localStorage.getItem("token");
    const url = `${REST_API_BASE_URL}`;
    return axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Function to register a new driver
export const registerDriver = ({ id, name, phoneNumber, vehicleNumber }) => {
    const token = localStorage.getItem("token");
    const url = `${REST_API_BASE_URL}/register`;
    return axios.post(url, 
        {
            id,
            name,
            phoneNumber,
            vehicleNumber,
        }, 
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

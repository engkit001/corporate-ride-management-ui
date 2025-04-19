import axios from "axios";

const DRIVER_SERVICE_BASE_URL = import.meta.env.VITE_DRIVER_SERVICE_URL;

// Function to get the list of drivers
export const listDrivers = () => {
    const token = localStorage.getItem("token");
    const url = `${DRIVER_SERVICE_BASE_URL}`;
    return axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Function to register a new driver
export const registerDriver = ({ id, name, phoneNumber, vehicleNumber }) => {
    const token = localStorage.getItem("token");
    const url = `${DRIVER_SERVICE_BASE_URL}/register`;
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

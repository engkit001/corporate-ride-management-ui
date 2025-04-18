// src/services/rideService.js
import axios from "axios";
import { getUserFromToken } from "../utils/authUtils";

const REST_API_BASE_URL = 'http://localhost:8080/rides';

// Function to get the list of rides
export const listRides = () => {
    const token = localStorage.getItem("token");
    const user = getUserFromToken();

    let url = REST_API_BASE_URL;

    if (user) {
        const params = new URLSearchParams();

        if (user.role === "PASSENGER") {
            params.append("userId", user.sub);
            url += `?${params.toString()}`;
            console.log("url passenger", url);
        } else if (user.role === "DRIVER") {
            params.append("driverId", user.sub);
            url += `?${params.toString()}`;
        }
    }

    return axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Function to cancel a ride by ID
export const cancelRide = (rideId) => {
    const token = localStorage.getItem("token");
    const url = `${REST_API_BASE_URL}/${rideId}/cancel`;

    return axios.patch(url, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Function to start a ride by ID
export const startRide = (rideId) => {
    const token = localStorage.getItem("token");
    const url = `${REST_API_BASE_URL}/${rideId}/start`;

    return axios.patch(url, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Function to complete a ride by ID
export const completeRide = (rideId) => {
    const token = localStorage.getItem("token");
    const url = `${REST_API_BASE_URL}/${rideId}/complete`;

    return axios.patch(url, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Function to request a ride
export const requestRide = ({ userId, pickupLocation, dropoffLocation }) => {
    const token = localStorage.getItem("token");
    const url = `${REST_API_BASE_URL}/request`;
    return axios.post(url, 
        {
            userId,
            pickupLocation,
            dropoffLocation,
        }, 
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
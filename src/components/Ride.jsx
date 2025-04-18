import React, { useEffect, useState } from "react";
import { formatDateToMinute } from "../utils/dateUtils";
import { getUserFromToken } from "../utils/authUtils";
import {
  listRides,
  startRide,
  completeRide,
  cancelRide,
  requestRide,
} from "../services/rideService";

const Ride = () => {
  const [rides, setRides] = useState([]);
  const user = getUserFromToken();

  const [newRide, setNewRide] = useState({
    userId: user?.sub || "",
    pickupLocation: "",
    dropoffLocation: "",
  });

  const refreshRides = () => {
    listRides()
      .then((response) => setRides(response.data))
      .catch((err) => {
        alert("Failed to refresh rides: " + err.response?.data.error);
      });
  };

  useEffect(() => {
    // Fetch on mount
    refreshRides();

    // Custom event listener to allow external refresh
    const handleRefresh = () => refreshRides();
    window.addEventListener("refreshRides", handleRefresh);

    return () => {
      window.removeEventListener("refreshRides", handleRefresh);
    };
  }, []);

  const handleCancel = (rideId) => {
    cancelRide(rideId)
      .then(() => refreshRides())
      .catch((err) => {
        alert("Failed to cancel ride: " + err.response?.data.error);
      });
  };

  const handleStart = (rideId) => {
    startRide(rideId)
      .then(() => refreshRides())
      .catch((err) => {
        alert("Failed to start ride: " + err.response?.data.error);
      });
  };

  const handleComplete = (rideId) => {
    completeRide(rideId)
      .then(() => refreshRides())
      .catch((err) => {
        alert("Failed to complete ride: " + err.response?.data.error);
      });
  };

  return (
    <div className="container">
      {user?.role === "PASSENGER" && (
        <div className="mb-4">
          <h2>Request a Ride</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              requestRide(newRide)
                .then(() => {
                  refreshRides();
                  setNewRide({
                    ...newRide,
                    pickupLocation: "",
                    dropoffLocation: "",
                  });
                })
                .catch((err) =>
                  alert("Failed to request ride: " + err.response?.data.error)
                );
            }}
          >
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Pickup Location"
                value={newRide.pickupLocation}
                onChange={(e) =>
                  setNewRide({ ...newRide, pickupLocation: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Dropoff Location"
                value={newRide.dropoffLocation}
                onChange={(e) =>
                  setNewRide({ ...newRide, dropoffLocation: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Request
            </button>
          </form>
        </div>
      )}

      <h2 className="text-center">List of Rides</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Driver ID</th>
            <th>Pickup Location</th>
            <th>Dropoff Location</th>
            <th>Requested Time</th>
            <th>Assigned Time</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Cancelled Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rides.map((ride) => (
            <tr key={ride.id}>
              <td>{ride.id}</td>
              <td>{ride.userId}</td>
              <td>{ride.driverId}</td>
              <td>{ride.pickupLocation}</td>
              <td>{ride.dropoffLocation}</td>
              <td>{formatDateToMinute(ride.rideRequestedTime)}</td>
              <td>{formatDateToMinute(ride.rideAssignedTime)}</td>
              <td>{formatDateToMinute(ride.rideStartTime)}</td>
              <td>{formatDateToMinute(ride.rideEndTime)}</td>
              <td>{formatDateToMinute(ride.rideCanceledTime)}</td>
              <td>{ride.status}</td>
              <td>
                {(ride.status === "PENDING" || ride.status === "ASSIGNED") &&
                  (user?.role === "ADMIN" || user?.role === "PASSENGER") && (
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => handleCancel(ride.id)}
                    >
                      Cancel
                    </button>
                  )}

                {ride.status === "ASSIGNED" && user?.role === "DRIVER" && (
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleStart(ride.id)}
                  >
                    Start
                  </button>
                )}

                {ride.status === "ONGOING" && user?.role === "DRIVER" && (
                  <button
                    className="btn btn-success"
                    onClick={() => handleComplete(ride.id)}
                  >
                    Complete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ride;

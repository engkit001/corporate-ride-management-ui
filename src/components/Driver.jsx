import React, { useEffect, useState } from "react";
import { registerDriver, listDrivers } from "../services/driverService";
import { getUserFromToken } from "../utils/authUtils";
import { useNavigate } from "react-router-dom";

const Driver = () => {
  const user = getUserFromToken();
  const navigate = useNavigate();

  const [drivers, setDrivers] = useState([]);
  const [newDriver, setNewDriver] = useState({
    id: "",
    name: "",
    phoneNumber: "",
    vehicleNumber: "",
  });

  useEffect(() => {
    if (!user || user.role !== "ADMIN") {
      alert("Unauthorized access. Admins only.");
      navigate("/"); // Redirect to home or login
    } else {
      refreshDrivers();
    }
  }, []);

  const refreshDrivers = () => {
    listDrivers()
      .then((res) => setDrivers(res.data))
      .catch((err) =>
        alert("Failed to fetch drivers: " + err.response?.data?.error)
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerDriver(newDriver)
      .then(() => {
        refreshDrivers();
        setNewDriver({ id: "", name: "", phoneNumber: "", vehicleNumber: "" });
      })
      .catch((err) =>
        alert("Failed to register driver: " + err.response?.data?.error)
      );
  };

  return (
    <div className="container">
      <div className="mb-4">
        <h2>Register Driver</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Id"
              value={newDriver.id}
              onChange={(e) =>
                setNewDriver({ ...newDriver, id: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={newDriver.name}
              onChange={(e) =>
                setNewDriver({ ...newDriver, name: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Phone Number"
              value={newDriver.phoneNumber}
              onChange={(e) =>
                setNewDriver({ ...newDriver, phoneNumber: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Vehicle Number"
              value={newDriver.vehicleNumber}
              onChange={(e) =>
                setNewDriver({ ...newDriver, vehicleNumber: e.target.value })
              }
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>

      <h2 className="text-center">List of Drivers</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Vehicle Number</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.id}>
              <td>{driver.id}</td>
              <td>{driver.name}</td>
              <td>{driver.phoneNumber}</td>
              <td>{driver.vehicleNumber}</td>
              <td>{driver.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Driver;

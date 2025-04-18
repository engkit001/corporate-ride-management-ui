import React, { useEffect, useState } from "react";
import { registerUser, listUsers } from "../services/userService";
import { getUserFromToken } from "../utils/authUtils";
import { useNavigate } from "react-router-dom";

const User = () => {
  const user = getUserFromToken();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "PASSENGER",
  });

  useEffect(() => {
    if (!user || user.role !== "ADMIN") {
      alert("Unauthorized access. Admins only.");
      navigate("/"); // Redirect to home or login
    } else {
      refreshUsers();
    }
  }, []);

  const refreshUsers = () => {
    listUsers()
      .then((res) => setUsers(res.data))
      .catch((err) =>
        alert("Failed to fetch users: " + err.response?.data.error)
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(newUser)
      .then(() => {
        refreshUsers();
        setNewUser({ username: "", password: "", role: "PASSENGER" });
      })
      .catch((err) =>
        alert("Failed to register user: " + err.response?.data.error)
      );
  };

  return (
    <div className="container">
      <div className="mb-4">
        <h2>Register User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-2">
            <select
              className="form-control"
              value={newUser.role}
              onChange={(e) =>
                setNewUser({ ...newUser, role: e.target.value })
              }
            >
              <option value="PASSENGER">PASSENGER</option>
              <option value="DRIVER">DRIVER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>

      <h2 className="text-center">List of Users</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;

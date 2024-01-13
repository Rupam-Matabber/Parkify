import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "./login.css";
import { onPostData, removeData, setData } from "../../../apicalling";
const { useNotifications } = require("../../../../context/NotificationContext");

export default function UserLogin() {
  const [page, setPage] = useState("login");

  // all form values

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [licenseId, setLicenseId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { createNotification } = useNotifications();
  const [userRedirect, setUserRedirect] = useState(false);
  const [garageRedirect, setGarageRedirect] = useState(false);


  const changePage = (e) => {
    e.preventDefault();
    if (page === "login") {
      setPage("signup");
    } else {
      setPage("login");
    }
  };

  const handleNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleRoleChange = (e) => {
    e.preventDefault();
    setRole(e.target.value);
  };

  const handlePhoneChange = (e) => {
    e.preventDefault();
    setPhone(e.target.value);
  };

  const handleAddressChange = (e) => {
    e.preventDefault();
    setAddress(e.target.value);
  };

  const handleLicenseIdChange = (e) => {
    e.preventDefault();
    setLicenseId(e.target.value);
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      const user = {
        email: email,
        password: password,
      };

      const data = await onPostData("users/login", user);

      if (data.error) {
        createNotification("error", data.error);
      } else {
        console.log(data.data.user);
        setData(data.data.user);
        // redirect to booking page
        createNotification("success", "Logged In");
        if (data.data.user.role === "user")
          setUserRedirect(true);
        else
          setGarageRedirect(true);

      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        removeData();
      }
      createNotification("error", err.response.data.message);
    }
  };

  if (userRedirect) {
    return <Redirect to="/user/book" />;
  }

  if (garageRedirect) {
    return <Redirect to="/garage/dashboard" />;
  }

  const handleRegister = async (e) => {
    try {
      e.preventDefault();

      const user = {
        name: name,
        role: role,
        phone: phone,
        address: address,
        licenseId: licenseId,
        email: email,
        password: password,
      };

      const data = await onPostData("users/register", user);

      if (data.error) {
        createNotification("error", data.error);
      } else {
        console.log(data.data.user);
        setData(data.data.user);
        // redirect to booking page
        createNotification("success", "Logged In");
        if (data.data.user.role === "user")
          setUserRedirect(true);
        else
          setGarageRedirect(true);

      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        removeData();
      }
      createNotification("error", err.response.data.message);
    }

  };

  return (
    <section className="home">
      <div className="form_container">
        {page === "signup" && (
          <div className="form login_form">
            <form onSubmit={handleRegister}>
              <h2>User Signup</h2>

              {/* name */}

              <div className="input_box">
                <i className="uil uil-user"></i>
                <input
                  type="text"
                  placeholder="Enter your name"
                  required
                  onChange={handleNameChange}
                />
              </div>

              {/* role - (drop down with options "user" and "no_garage") */}

              <div className="input_box">
                {/* <i className="uil uil-user"></i> */}
                <select
                  name="role"
                  id="role"
                  required
                  onChange={handleRoleChange}
                >
                  <option value="" disabled selected>
                    Select your role
                  </option>
                  <option value="user">User</option>
                  <option value="no_garage">No Garage</option>
                </select>
              </div>

              {/* phone */}

              <div className="input_box">
                <i className="uil uil-phone"></i>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  required
                  onChange={handlePhoneChange}
                />
              </div>

              {/* address */}

              <div className="input_box">
                <i className="uil uil-map-marker"></i>
                <input
                  type="text"
                  placeholder="Enter your address"
                  required
                  onChange={handleAddressChange}
                />
              </div>

              {/* licenseId */}

              <div className="input_box">
                <i className="uil uil-envelope-alt email"></i>
                <input
                  type="text"
                  placeholder="Enter your license ID"
                  required
                  onChange={handleLicenseIdChange}
                />
                {/* <i className="uil uil-id-card"></i> */}
              </div>

              {/* email */}

              <div className="input_box">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  onChange={handleEmailChange}
                />
                <i className="uil uil-envelope-alt email"></i>
              </div>

              {/* password */}

              <div className="input_box">
                <input
                  type="password"
                  placeholder="Enter your password"
                  required
                  onChange={handlePasswordChange}
                />
                <i className="uil uil-lock password"></i>
                <i className="uil uil-eye-slash pw_hide"></i>
              </div>

              <button className="button">Signup Now</button>

              <div className="login_signup">
                Already have an account?{" "}
                <a onClick={changePage} id="signup">
                  Login
                </a>
              </div>
            </form>
          </div>
        )}

        {page === "login" && (
          <div className="form login_form">
            <form onSubmit={handleLogin}>
              <h2>User Login</h2>

              {/* email */}

              <div className="input_box">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  onChange={handleEmailChange}
                />
                <i className="uil uil-envelope-alt email"></i>
              </div>

              {/* password */}

              <div className="input_box">
                <input
                  type="password"
                  placeholder="Enter your password"
                  required
                  onChange={handlePasswordChange}
                />
                <i className="uil uil-lock password"></i>
                <i className="uil uil-eye-slash pw_hide"></i>
              </div>

              <button className="button">Login</button>

              <div className="login_signup">
                Don't have an account?{" "}
                <a onClick={changePage} id="signup">
                  Signup
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

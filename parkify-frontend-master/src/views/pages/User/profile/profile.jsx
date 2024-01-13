import React, { useState, useEffect } from "react";
import { getCookies } from "../../../apicalling";
import "./profile.css";
import image from "../../../assets/images/ppic.jpg"
const { useNotifications } = require("../../../../context/NotificationContext");

export default function UserLogin() {
  // the state will get data from cookies

  const [firstName, setFirstName] = useState("Arya");
  const [lastName, setLastName] = useState("Chakraborty");
  const [userName, setUserName] = useState("user_name");
  const [email, setEmail] = useState("example@gmail.com");
  const { createNotification } = useNotifications();

  useEffect(() => {
    const cookies = getCookies();

    console.log(cookies);
    if (cookies) {
      setFirstName(cookies.name.split(" ")[0]);
      setLastName(cookies.name.split(" ")[1] ? cookies.name.split(" ")[1] : "-");
      setUserName(cookies.phone);
      setEmail(cookies.email);
    }
  }, []);

  const underConstruction = () => {
    createNotification("info", "This feature is under construction");
  };

  return (
    <section>
      <div className="div-container">
        <div className="right-div">
          <div className="container">
            <div className="card">
              <div className="profile-pic">
                <img src={image} alt="profile" />
              </div>
              <div className="profile-info">
                <h2 className="name">{firstName + " " + lastName}</h2>
                <h3 className="username">{userName}</h3>
              </div>
              <div className="stats">
                <div className="stat">
                  <h4 className="number">51</h4>
                  <p className="label">Uses</p>
                </div>
                <div className="stat">
                  <h4 className="number">4.82</h4>
                  <p className="label">Ratings</p>
                </div>
                <div className="stat">
                  <h4 className="number">3</h4>
                  <p className="label">Saved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="left-div">
          <div className="div-top">
            <h3>My account</h3>
            <a href="#" className="edit-btn" onClick={underConstruction}>
              Edit
            </a>
          </div>
          <div className="div-row">
            <div className="div-cell">
              <p className="cell-head">First Name</p>
              <p className="cell-content">{firstName}</p>
            </div>
            <div className="div-cell">
              <p className="cell-head">Last Name</p>
              <p className="cell-content">{lastName}</p>
            </div>
          </div>
          <div className="div-row">
            <div className="div-cell">
              <p className="cell-head">Phone</p>
              <p className="cell-content">{userName}</p>
            </div>
            <div className="div-cell">
              <p className="cell-head">Email</p>
              <p className="cell-content">{email}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

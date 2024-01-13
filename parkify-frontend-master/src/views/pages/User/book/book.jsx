import React from "react";
import { Link } from "react-router-dom";
import { onGetData } from "../../../apicalling";
import "./book.css";

export default function NotFound() {

  const [garages, setGarages] = React.useState([])


  const searchForGarages = () => {

    // get current lat and long

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(latitude, longitude);
        //22.5790932 88.4762687
        onGetData("garages/book", { latitude, longitude })
          .then((data) => {
            console.log(data);
            setGarages(data.data.garages);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };



  return (
    <main>
      <div className="search-part">
        <h1>Welcome to Parkify!</h1>
        <button className="button"><Link to="/user/profile">Got to Profile</Link></button>
        <button className="button"><Link to="/user/billing">Got to History</Link></button>
        <button className="button" onClick={searchForGarages}>Search for Garages</button>
      </div>
      <div className="result-part">.

        {garages && garages.map((garage, index) => {

          return (<div className="result-row" key={index}>
            <div className="result-cells">
              <h4>Garage Name :</h4>
              <p>{garage.name}</p>
            </div>
            <div className="result-cells">
              <h4>Location :</h4>
              <p>{garage.locationCategory}</p>
            </div>
            <div className="result-cells">
              <h4>Charge per hour :</h4>
              <p>{garage.chargePerHour}</p>
            </div>
            <div className="result-cells" id="book-btn-cell">
              <button className="book-btn">
                {/* get google maps link for lat and long */}
                <a href={`https://www.google.com/maps/search/?api=1&query=${garage.locationX},${garage.locationY}`} target="_blank" rel="noreferrer">Book</a>
              </button>
            </div>
          </div>)
        })}

      </div>
    </main>
  );
}
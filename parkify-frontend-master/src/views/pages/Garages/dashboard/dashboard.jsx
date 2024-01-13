import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { onGetData, onPostData, getCookies } from "../../../apicalling";
import "./dashboard.css";
import image from "../../../assets/images/garage.jpg";
const { useNotifications } = require("../../../../context/NotificationContext");

export default function NotFound() {

  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [lat, setLat] = React.useState(0);
  const [long, setLong] = React.useState(0);
  const [locationCategory, setLocationCategory] = React.useState("prime");
  const [chargePerHour, setChargePerHour] = React.useState(0);
  const [slots, setSlots] = React.useState(0);
  const { createNotification } = useNotifications();


  const [garages, setGarages] = React.useState([]);

  useEffect(() => {
    const fetchGarages = async () => {
      const data = await onGetData("garages/all");
      setGarages(data.data.garages);
    };
    fetchGarages();
  }, []);

  const handleNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleAddressChange = (e) => {
    e.preventDefault();
    setAddress(e.target.value);
  };

  const handleLatChange = (e) => {
    e.preventDefault();
    setLat(e.target.value);
  };

  const handleLongChange = (e) => {
    e.preventDefault();
    setLong(e.target.value);
  };

  const handleLocationCategoryChange = (e) => {
    e.preventDefault();
    setLocationCategory(e.target.value);
  };

  const handleChargePerHourChange = (e) => {
    e.preventDefault();
    setChargePerHour(e.target.value);
  };

  const handleSlotsChange = (e) => {
    e.preventDefault();
    setSlots(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const cookies = getCookies();

      const garage = {
        name: name,
        address: address,
        locationX: lat,
        locationY: long,
        locationCategory: locationCategory,
        chargePerHour: chargePerHour,
        slots: slots,
        //from cookies
        email: cookies.email,
        ownerUserId: cookies._id,

      }

      const data = await onPostData("garages/new", garage);

      if (data.error) {
        createNotification("error", data.error);
      } else {
        // redirect to booking page
        createNotification("success", "Garage created successfully");
        // reload
        window.location.reload();

      }
    } catch (err) {
      createNotification("error", err.response.data.message);
    }
  };

  return (
    <section>
      <div className="top-part">
        <h1>All Garages</h1>
      </div>
      <div className="garage-card-container">
        {garages &&
          garages.map((garage, i) => {

            return (
              <div className="garage-card" key={i}>
                <img src={image} alt="John" />
                <h2>{garage.name}</h2>
                <div className="content-container">
                  <div className="content-row">
                    <p className="title">Location :</p>
                    <p className="data">{garage.locationCategory}</p>
                  </div>
                  <div className="content-row">
                    <p className="title">Latitude :</p>
                    <p className="data">{garage.locationX}</p>
                  </div>
                  <div className="content-row">
                    <p className="title">Longitude :</p>
                    <p className="data">{garage.locationY}</p>
                  </div>



                  <p>
                    <Link to={"/garage/" + garage._id}><button style={{ width: "80%", marginTop: "10px" }}>Manage</button></Link>
                  </p>
                </div>
              </div>
            );
          })}
      </div>

      <div className="addGarageForm">
        <form onSubmit={handleSubmit}>

          <h1>Create New Garage</h1>

          {/* with handle changes as well */}

          <input type="text" placeholder="Garage Name" onChange={handleNameChange} />
          <input type="text" placeholder="Address" onChange={handleAddressChange} />
          <input type="number" placeholder="Latitude" onChange={handleLatChange} />
          <input type="number" placeholder="Longitude" onChange={handleLongChange} />
          <input type="number" placeholder="Slots" onChange={handleSlotsChange} />
          <input type="number" placeholder="Charge Per Hour" onChange={handleChargePerHourChange} />

          {/* location category can have values  "prime", "normal", "outskirt" */}

          <select name="locationCategory" id="locationCategory" onChange={handleLocationCategoryChange}>
            <option value="prime">Prime</option>
            <option value="normal">Normal</option>
            <option value="outskirt">Outskirt</option>
          </select>

          <button>Create</button>

          {/* form to create new garage ends */}

        </form>
      </div>

    </section>
  );
}


import React, { useEffect, useState } from "react";
import { onGetData, getCookies } from "../../../apicalling";

import "./billing.css";

export default function NotFound() {

 const [billings, setBillings] = React.useState([])

 useEffect(() => {

  // get user id from cookies

  let data = getCookies("data");
  data = data._id


  onGetData("bookings/get?id=" + data)
   .then((data) => {
    console.log(data);
    setBillings(data.data);
   })
   .catch((err) => {
    console.log(err);
   });
 }, [])



 return (
  <body>
   <main>
    <div className="search-part">
     <h1>Parkify Billing</h1>
    </div>
    <div className="result-part">

     {billings && billings.map((billing, index) =>
      <div className="result-row" key={index}>
       <div className="result-cells">
        <h4>Garage ID :</h4>
        <p>{billing.garageId}</p>
       </div>
       <div className="result-cells">
        <h4>In Time :</h4>
        <p>{billing.startTime}</p>
       </div>
       <div className="result-cells">
        <h4>Exit Time :</h4>
        <p>{billing.updatedAt}</p>
       </div>
       <div className="result-cells" id="book-btn-cell">
        <button className="book-btn">
         {billing.amount}
        </button>
       </div>
      </div>
     )}


    </div>
   </main>
  </body>
 );
}
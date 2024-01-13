import React from "react";
import { Link } from "react-router-dom";

import landing from "../../assets/images/undraw_Online_organizer_re_156n-removebg-preview.png"

import "./home.css";

export default function NotFound() {
 return (
  <>
   <header>
    <div className="container">
     <div className="logo">
      <h3>Parkify</h3>
     </div>

     <div className="links">
      <ul>
       <li><a href="/">Home</a></li>
       <li><a href="/about">About</a></li>
       <li><a href="#footer">Contact</a></li>
       <li><Link to="/user/login" className="btn"><i className="fas fa-sign-in-alt"></i> Sign In</Link></li>
      </ul>
     </div>
     <div className="overlay"></div>

     <div className="hamburger-menu">
      <div className="bar"></div>
     </div>
    </div>
   </header>

   <main>
    <div className="big-wrapper light">
     <div className="container">


      <div className="hamburger-menu">
       <div className="bar"></div>
      </div>
     </div>
     <div className="showcase-area">
      <div className="container">
       <div className="left">
        <div className="big-title">
         <h1>Park car faster!</h1>
         <h1>Since we are here to assist you.</h1>
        </div>
        <p className="text">
         Robust, AI-powered, scalable parking solution with a cost-effective and efficient hardware alternative.
        </p>
        <div className="cta">
         <a href="/login" className="btn"><i className="fas fa-rocket"></i>  Get Started</a>
        </div>
       </div>

       <div className="right">
        <img src={landing} alt="Person Image" className="person" />
       </div>
      </div>
     </div>
    </div>


   </main >
   <footer className="footer" id="footer">
    <div className="container">
     <div className="row">
      <div className="footer-col">
       <div className="footer-links">
        <h4>CONTACT US</h4>
        <p> Hack-over-flow<br />
         Kalyani Government Engineering College<br />
         Kalyani,Nadia <br />
         West Bengal <br />
         <br />
         <strong>Email : </strong>Example@gmail.com<br />
         <strong>Phone : </strong>+91 - 9874512345
        </p>

       </div>
      </div>

      <div className="footer-col">
       <h4>follow us</h4>
       <div className="social-links">
        <a href="#"><i className="fab fa-facebook-f"></i></a>
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-linkedin"></i></a>
        <a href="#"><i className="fab fa-discord"></i></a>
       </div>
      </div>

      <div className="footer-col">
       <h4>More</h4>
       <br />
       <ul>
        <li>
         <a href="#">FAQ</a>
        </li>

        <li>
         <a href="#">Terms of Use</a>
        </li>

        <li>
         <a href="#">Privacy Policy</a>
        </li>

       </ul>
      </div>
     </div>
    </div>

   </footer>

  </>
 );
}

import React from "react";
import '../styles/landing.css'
import landingpageimg from '../images/landingpageimg.png';
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="Landing">
      <div className="cover"></div>
      <header id="Header">
      <div className="cover"></div>
      <h1>
        JOB<span>DONE</span>
      </h1>
      <ul>
        <li><button><Link className="login button" to="/login">Log In</Link></button></li>
      </ul>
    </header>
      <main>
        <div className="mainleft">
          <h1>Discover Talent & Unlock Opportunities</h1>
          <h3>Connecting skilled freelancers with clients seeking the right talent,
we foster a vibrant community where collaboration thrives and mutual growth is achieved.</h3>
          <div className="buttons">
            <button><Link className="client button" to="/signUp/user">
            Hire a Freelancer
            </Link></button>
            <button><Link className="freelancer button" to="/signUp/freelancer">
            Earn Money Freelancing
            </Link></button>
          </div>
        </div>
        <div className="mainright">
          <img src={landingpageimg} alt="" />
        </div>
      </main>
    </div>
  );
}

export default Landing;
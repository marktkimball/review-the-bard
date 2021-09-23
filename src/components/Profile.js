import React from "react";
import profileImage from "../assets/shakespeare.jpeg";

export const Profile = () => (
  <div className="profile">
    <img className="profile-picture" src={profileImage} alt="shakespeare" />
    <div>
      <h3 className="profile-title">William Shakespeare</h3>
      <p>
        <span className="text-bold">Born:</span> April 26, 1564
      </p>
      <p>
        <span className="text-bold">Location:</span> Stratford-upon-Avon
      </p>
      <p>
        <span className="text-bold">Genres:</span> Histories, Comedies,
        Tragedies
      </p>
    </div>
  </div>
);

import React from "react";
import "./IntroToAdd.scss";

const IntroToAdd = ({ phoneNumber, message }) => {
  const handleWhatsAppGroup = () => {
    const whatsappURL = `https://chat.whatsapp.com/C8Bx6VQkhP61Nbe1K73WyL`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="IntroToAddbox">
      <button className="JoinBtn" onClick={handleWhatsAppGroup}>
        Join our Free Workshops
      </button>
      <span className="discount"> 50% OFF for Students in Therapy</span>
    </div>
  );
};

export default IntroToAdd;
//this is for testing

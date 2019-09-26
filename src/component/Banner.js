import React from "react";
import "../styles.css";
import Image from "../images/gallery.jpeg";
import { Link } from "react-router-dom";

const styles = {
  image: {
    backgroundImage: `url(${Image})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover"
  }
};

export default function() {
  return (
    <>
      <div className="banner" style={styles.image}>
        <div className="welcome">
          <h1>Welcome to Art World</h1>
          <Link to="/paintings" className="button"> Enter Gallery</Link>
        </div>
      </div>
    </>
  );
}

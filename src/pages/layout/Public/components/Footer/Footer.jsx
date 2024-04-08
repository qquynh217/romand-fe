import {
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoPinterest,
} from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";

function Footer() {
  return (
    <div className="public-layout-footer">
      <p className="copy-right">
        Copyright © 2022 <span style={{ color: "#F65D4E" }}>Bookory</span>. All
        rights reserved.
      </p>
      <div className="social-contact">
        <p>
          Contact:{" "}
          <span style={{ fontSize: 16, color: "#fff" }}>bookory@gmail.com</span>{" "}
        </p>
        <span>|</span>
        <FaFacebookF className="scocial-icon" />
        <IoLogoTwitter className="scocial-icon" />
        <IoLogoInstagram className="scocial-icon" />
        <IoLogoPinterest className="scocial-icon" />
      </div>
    </div>
  );
}

export default Footer;

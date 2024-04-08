import { useContext, useEffect, useState } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import Logo from "resources/svg/Logo";
import { CartContext } from "context/CartContext";
import Footer from "../layout/Public/components/Footer/Footer";

function CheckoutSuccess() {
  const { id } = useParams();
  const { handleCheckoutSuccess } = useContext(CartContext);
  useEffect(() => {
    handleCheckoutSuccess(id);
  }, []);
  return (
    <div className="success-wrapper">
      <Link to="/" className="logo">
        <Logo />
      </Link>
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">If you have any questions, please email</p>
        <a className="email" href="mailto:order@example.com">
          bookory@gmail.com
        </a>
        <Link to="/">
          <button width="300px" className="app-button">
            Coninue Shopping
          </button>
        </Link>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default CheckoutSuccess;

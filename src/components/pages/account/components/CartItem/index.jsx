import { IoCloseCircleOutline } from "react-icons/io5";
import { useAddToCart } from "components/pages/book-detail/hooks/useAddToCart";
import { round } from "utils";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "context/CartContext";
import { Link, useNavigate } from "react-router-dom";
function CartItem({ item, order = false, qty, id }) {
  const { toggleCardItemQuantity, onRemove } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className={`cart-item ${order ? "order" : ""}`}>
      <img
        src={item.image}
        className="cart-item-image"
        onClick={() => {
          navigate(`/book/${item.slug}`);
        }}
      />
      <div className="item-desc">
        <div className="top">
          <Link to={`/book/${item.slug}`}>
            <h2>{item.name}</h2>
          </Link>
          <h2 className="price">{round(item.price * qty, 2)} $</h2>
        </div>
        <p>#{item.optionName}</p>
        {order ? (
          <p className="quantity">Quantities: {qty}</p>
        ) : (
          <div className="bottom">
            <div className="quantity-input">
              <div
                className="quantity-button minus"
                onClick={() => {
                  toggleCardItemQuantity(id, "dec");
                }}
              >
                -
              </div>
              <div className="quantity-button">
                <input type="number" value={qty} readOnly />
              </div>
              <div
                className="quantity-button plus"
                onClick={() => {
                  toggleCardItemQuantity(id, "inc");
                }}
              >
                +
              </div>
            </div>
            <button
              className="remove-item"
              onClick={() => {
                onRemove(item);
              }}
            >
              <IoCloseCircleOutline />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartItem;

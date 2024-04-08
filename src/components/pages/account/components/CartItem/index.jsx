import { IoCloseCircleOutline } from "react-icons/io5";
import { useAddToCart } from "components/pages/book-detail/hooks/useAddToCart";
import { round } from "utils";
import { useContext } from "react";
import { CartContext } from "context/CartContext";
import { Link, useNavigate } from "react-router-dom";
function CartItem({ item, order = false }) {
  const { toggleCardItemQuantity, onRemove } = useContext(CartContext);
  const navigate = useNavigate();
  return (
    <div className={`cart-item ${order ? "order" : ""}`}>
      <img
        src={`http://localhost:8080/api/image/${item.slug}`}
        className="cart-item-image"
        onClick={() => {
          navigate(`/book/${item.slug}`);
        }}
      />
      <div className="item-desc">
        <div className="top">
          <Link to={`/book/${item.slug}`}>
            <h2>{item.title}</h2>
          </Link>
          <h2 className="price">{round(item.price * item.quantity, 2)} $</h2>
        </div>
        <p>{item.author}</p>
        {order ? (
          <p className="quantity">Quantities: {item.quantity}</p>
        ) : (
          <div className="bottom">
            <div className="quantiy-input">
              <div
                className="quantiy-button minus"
                onClick={() => {
                  toggleCardItemQuantity(item.id, "dec");
                }}
              >
                -
              </div>
              <input type="number" value={item.quantity} readOnly />
              <div
                className="quantiy-button plus"
                onClick={() => {
                  toggleCardItemQuantity(item.id, "inc");
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

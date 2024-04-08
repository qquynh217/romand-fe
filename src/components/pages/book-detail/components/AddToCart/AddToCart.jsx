import { useContext } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { CartContext } from "context/CartContext";
import { useAddToCart } from "../../hooks/useAddToCart";
import { Button, notification } from "antd";

function AddToCart({ item }) {
  const { value, increaseValue, decreaseValue, changeValue, onBlur } =
    useAddToCart();
  const { onAdd } = useContext(CartContext);
  return (
    <div className="add-to-cart">
      <div className="quantity-input">
        <div className="quantity-button minus" onClick={decreaseValue}>
          -
        </div>
        <div className="quantity-button">
          <input
            type="number"
            value={value}
            onChange={changeValue}
            onBlur={onBlur}
          />
        </div>
        <div className="quantity-button plus" onClick={increaseValue}>
          +
        </div>
      </div>
      <Button
        type="primary"
        className="add-button"
        onClick={() => {
          onAdd(item, value);
        }}
      >
        <span>Add to cart</span>
      </Button>
    </div>
  );
}

export default AddToCart;

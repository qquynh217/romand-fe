import { useContext } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { CartContext } from "context/CartContext";
import { useAddToCart } from "../../hooks/useAddToCart";
import { Button, notification } from "antd";
import showMessage from "components/Message";

function AddToCart({ item }) {
  const { value, increaseValue, decreaseValue, changeValue, onBlur } =
    useAddToCart();
  const { onAdd } = useContext(CartContext);
  const handleAddCart = async () => {
    if (item.id) {
      await onAdd(item, value);
    } else {
      showMessage("warning", "You have to selected option");
    }
  };
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
      <Button type="primary" className="add-button" onClick={handleAddCart}>
        <span>Add to cart</span>
      </Button>
    </div>
  );
}

export default AddToCart;

import { useContext } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { CartContext } from "context/CartContext";
import { useAddToCart } from "../../hooks/useAddToCart";
import { Button, Space, notification } from "antd";
import showMessage from "components/Message";

function AddToCart({ item, totalQty }) {
  const { value, increaseValue, decreaseValue, changeValue, onBlur } =
    useAddToCart(item);
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
      <Space>
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
              max={item.quantity}
            />
          </div>
          <div
            className="quantity-button plus"
            onClick={() => {
              if (value < item.quantity) increaseValue();
            }}
          >
            +
          </div>
        </div>
        <p>{item.id ? item.quantity : totalQty} products available</p>
      </Space>
      <Button type="primary" className="add-button" onClick={handleAddCart}>
        <span>Add to cart</span>
      </Button>
    </div>
  );
}

export default AddToCart;

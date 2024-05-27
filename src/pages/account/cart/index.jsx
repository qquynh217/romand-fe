import { Empty } from "antd";
import CartItem from "components/pages/account/components/CartItem";
import { CartContext } from "context/CartContext";
import { useContext, useEffect } from "react";
import { useAuthentication } from "store/useAuthentication";
import { round } from "utils";

function Cart() {
  const { cartItems, totalPrice, handleCheckout, fetchData } =
    useContext(CartContext);
  console.log(cartItems);
  const { id } = useAuthentication();

  useEffect(() => {
    if (id) fetchData(id);
  }, [id]);
  return (
    <div className="cart">
      <h1 className="title">Cart</h1>
      <div className="cart-item-container">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem
              item={item.product}
              key={item.id}
              qty={item.qty}
              id={item.id}
            />
          ))
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>
      <div className="total">
        <div className="total-amount">
          <h2>Total:</h2> <h1 className="amount">{round(totalPrice, 2)} $</h1>
        </div>
        <button className="app-button" onClick={handleCheckout}>
          <span>CHECK OUT</span>
        </button>
      </div>
    </div>
  );
}

export default Cart;

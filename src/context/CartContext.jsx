import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const CartContext = createContext();

export const CartProvide = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  let foundProduct;
  let index;

  const fetchData = async (id) => {
    const res = await axios.get(`http://localhost:8080/api/carts/${id}`);
    let sum = res.data.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    let sumQuantity = res.data.reduce((acc, item) => acc + item.quantity, 0);
    setCartItems(res.data);
    setTotalPrice(sum);
    setTotalQuantities(sumQuantity);
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("bookory-user"));
    if (user?.id) {
      fetchData(user.id);
    }
  }, []);
  const onAdd = async (product, quantity) => {
    const user = JSON.parse(localStorage.getItem("bookory-user"));
    if (user.id) {
      const res = await axios.post("http://localhost:8080/api/cart/insert", {
        userid: user.id,
        bookid: product.id,
        quantity: quantity,
      });
      if (res.data == 200) {
        console.log(product);
        await fetchData(user.id);
        toast.success(`${quantity} ${product.title} added to the cart`);
      }
    } else {
      toast.error("Please login to add to cart !");
    }
  };

  const onRemove = async (product) => {
    const user = JSON.parse(localStorage.getItem("bookory-user"));
    const res = await axios.post("http://localhost:8080/api/cart/delete", {
      id: product.id,
    });
    console.log(res);
    if (res.data == "200") {
      fetchData(user.id);
    } else {
      toast.error("Delete not success !");
    }
  };
  const updateQuantity = async (id, action) => {
    await axios.post("http://localhost:8080/api/cart/update", {
      id: id,
      action: action,
    });
  };
  const toggleCardItemQuantity = async (id, value) => {
    foundProduct = cartItems.find((item) => item.id === id);
    index = cartItems.findIndex((product) => product.id === id);
    const newCartItems = cartItems.filter((item) => item.id !== id);

    if (value === "inc") {
      newCartItems.splice(index, 0, {
        ...foundProduct,
        quantity: foundProduct.quantity + 1,
      });
      await updateQuantity(id, 1);
      setCartItems([...newCartItems]);
      setTotalPrice((prev) => prev + foundProduct.price);
      setTotalQuantities((prev) => prev + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        newCartItems.splice(index, 0, {
          ...foundProduct,
          quantity: foundProduct.quantity - 1,
        });
        await updateQuantity(id, 0);
        setCartItems([...newCartItems]);
        setTotalPrice((prev) => prev - foundProduct.price);
        setTotalQuantities((prev) => prev - 1);
      }
    }
  };
  const handleCheckout = () => {
    // const orderid = crypto.randomUUID();
    // window.location.href = `/checkout-success/${orderid}`;
    axios
      .post("http://localhost:4242/create-checkout", cartItems)
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleCheckoutSuccess = async (id) => {
    const user = JSON.parse(localStorage.getItem("bookory-user"));
    await axios
      .post("http://localhost:8080/api/cart/buy", {
        orderid: id,
        userid: user.id,
      })
      .then((res) => {
        fetchData(user.id);
        // console.log(res.data);
      });
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        onAdd,
        toggleCardItemQuantity,
        onRemove,
        fetchData,
        handleCheckout,
        handleCheckoutSuccess,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

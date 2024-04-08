import { StrictMode, useEffect, useState } from "react";
import "./styles/_app.scss";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "react-slideshow-image/dist/styles.css";
import { useAuthentication } from "./store/useAuthentication";
import axios from "axios";
import { CartProvide } from "./context/CartContext";
import { Toaster } from "react-hot-toast";

function App() {
  const { login } = useAuthentication();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("bookory-user"));
    if (user?.isLogin) {
      axios.get(`http://localhost:8080/api/user/${user.id}`).then((res) => {
        const user = {
          email: res.data.email,
          name: res.data.username,
          id: res.data.id,
          role: res.data.userrole,
          avatar: res.data.avatar,
        };
        login(user);
      });
    }
  }, []);

  return (
    // <div className="App">
    <StrictMode>
      <CartProvide>
        <Toaster />
        <RouterProvider router={router} />
      </CartProvide>
    </StrictMode>
    // </div>
  );
}

export default App;

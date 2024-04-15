import axios from "axios";
import { StrictMode, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import { CartProvide } from "./context/CartContext";
import { router } from "./routes";
import { useAuthentication } from "./store/useAuthentication";
import "./styles/_app.scss";

function App() {
  const { login } = useAuthentication();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("ROMAND_USER"));

    if (user.state.isLogin) {
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

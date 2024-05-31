import axios from "axios";
import { StrictMode, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import { CartProvide } from "./context/CartContext";
import { router } from "./routes";
import { useAuthentication } from "./store/useAuthentication";
import "./styles/_app.scss";
import { userService } from "./services/user";

function App() {
  const { login, logout } = useAuthentication();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("ROMAND_USER"));

    if (user.state.isLogin) {
      try {
        userService
          .getUser({ username: user.state.username })
          .then((res) => {
            const user = {
              email: res.data.data.email || "",
              username: res.data.data.username || "",
              id: res.data.data.id || "",
              role: res.data.data.role || "",
              avatar: res.data.data.avatar || "",
              phone: res.data.data.phone || "",
              fullName: res.data.data.name || "",
              gender: res.data.data.gender || "",
              dob: res.data.data.dob || "",
            };

            login(user);
          })
          .catch(() => {
            logout();
          });
      } catch (error) {
        logout();
      }
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

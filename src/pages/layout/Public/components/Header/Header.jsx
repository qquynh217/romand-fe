import { Avatar, Badge, Button, Dropdown } from "antd";
import { category } from "constant/fakeData";
import { useContext, useState, useEffect } from "react";
import { IoLogoYoutube, IoLogoInstagram } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Logo from "resources/images/logo-text.avif";
import { ROUTE_URL } from "routes";
import { CartContext } from "context/CartContext";
import { useAuthentication } from "store/useAuthentication";
import LoginModal from "./components/LoginModal/LoginModal";
import SearchTool from "components/SearchTool";
import UserIcon from "resources/svg/UserIcon";
import CartIcon from "resources/svg/Cart";
import SearchIcon from "resources/svg/Search";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, logout } = useAuthentication();
  const { totalQuantities } = useContext(CartContext);
  const navigate = useNavigate();
  // Sticky Menu Area
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });

  /* Method that will fix header after a specific scrollable */
  const isSticky = (e) => {
    const header = document.querySelector(".page-header_wrapper");
    const scrollTop = window.scrollY;

    scrollTop >= 44
      ? header.classList.add("is-sticky")
      : header.classList.remove("is-sticky");
  };

  const userMenu = [
    {
      key: 1,
      label: <p>My Account</p>,
    },
    {
      key: 2,
      label: <p>My Purchase</p>,
    },
    {
      key: 3,
      label: (
        <p
          onClick={() => {
            logout();
          }}
        >
          Logout
        </p>
      ),
    },
  ];
  return (
    <div className="public-layout_header main-container">
      <div className="announcement-bar">
        <div className="announcement-bar_left">
          <IoLogoYoutube />
          <IoLogoInstagram />
        </div>
        <div className="announcement-bar_midle">
          <b>Free shipping</b> on orders +$30 & <b>Free gift</b> on orders
          +$50🎁
        </div>
        <div className="announcement-bar_right"></div>
      </div>
      <div className="page-header_wrapper">
        <div className="page-header">
          <div className="page-header_inner">
            <Link to={ROUTE_URL.HOME} className="logo">
              <img src={Logo} alt="logo" />
            </Link>
            <div className="category">
              <div className="category-item">
                <p>All products</p>
              </div>
              {category.map((item) => (
                <div className="category-item" key={item.id}>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
            <div className="page-header_right">
              {user.id && (
                <Dropdown
                  menu={{ items: userMenu }}
                  placement="bottomRight"
                  arrow={{ pointAtCenter: true }}
                >
                  <div className="navbar-item">
                    <UserIcon />
                  </div>
                </Dropdown>
              )}
              <div className="navbar-item">
                <SearchIcon />
              </div>
              {user.id ? (
                <div className="navbar-item">
                  <CartIcon />
                </div>
              ) : (
                <Button
                  type="primary"
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <LoginModal open={isModalOpen} setOpen={setIsModalOpen} />
    </div>
  );
}

export default Header;

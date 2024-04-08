import { Avatar } from "antd";
import { avatarList } from "constant";
import { BiUser } from "react-icons/bi";
import {
  IoReaderOutline,
  IoTrashBinOutline,
  IoCartOutline,
  IoExitOutline,
  IoChatbubbleEllipsesOutline,
} from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { ROUTE_URL } from "routes";
import { useAuthentication } from "store/useAuthentication";

function Sidebar() {
  const { user, logout } = useAuthentication();
  const navigate = useNavigate();
  return (
    <div className="account-sidebar">
      <div className="user-info">
        <Avatar
          src={avatarList[user.avatar - 1]}
          size={50}
          className="avatar"
        />
        <div className="user-name">
          <p className="name">{user.name}</p>
          <p className="email">{user.email}</p>
        </div>
      </div>
      <div className="account-menu">
        <NavLink
          to={ROUTE_URL.PROFILE}
          className={({ isActive }) =>
            `account-menu-item ${isActive ? "active" : ""}`
          }
        >
          <BiUser fontSize={20} className="icon" />
          <p>Profile</p>
        </NavLink>
        <NavLink
          to={ROUTE_URL.CART}
          className={({ isActive }) =>
            `account-menu-item ${isActive ? "active" : ""}`
          }
        >
          <IoCartOutline fontSize={20} className="icon" />
          <p>Cart</p>
        </NavLink>
        <NavLink
          to={ROUTE_URL.PENDING}
          className={({ isActive }) =>
            `account-menu-item ${isActive ? "active" : ""}`
          }
        >
          <IoChatbubbleEllipsesOutline fontSize={20} className="icon" />
          <p>Pending</p>
        </NavLink>
        <NavLink
          to={ROUTE_URL.PURCHASE}
          className={({ isActive }) =>
            `account-menu-item ${isActive ? "active" : ""}`
          }
        >
          <IoReaderOutline fontSize={20} className="icon" />
          <p>Purchased</p>
        </NavLink>
        <NavLink
          to={ROUTE_URL.CANCEL}
          className={({ isActive }) =>
            `account-menu-item ${isActive ? "active" : ""}`
          }
        >
          <IoTrashBinOutline fontSize={20} className="icon" />
          <p>Cancelled</p>
        </NavLink>
        <div
          className="account-menu-item"
          onClick={() => {
            logout();
            navigate(ROUTE_URL.HOME);
          }}
        >
          <IoExitOutline fontSize={20} className="icon" />
          <p>Logout</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

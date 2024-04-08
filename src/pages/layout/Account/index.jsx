import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "components/pages/account/components/Sidebar";
import { useEffect } from "react";
import { ROUTE_URL } from "routes";

function Account({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("bookory-user"));
    if (!user?.isLogin) {
      navigate(ROUTE_URL.HOME);
    }
  }, []);
  return (
    <div className="account-page">
      <div className="account-page-container">
        <Sidebar />
        <div className="account-page-children">{children}</div>
      </div>
    </div>
  );
}

export default Account;

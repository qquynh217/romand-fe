import { Divider } from "antd";
import ProductList from "components/ProductList/ProductList";
import { Link, NavLink } from "react-router-dom";
import { IoChevronForward } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import { item } from "constant/fakeData";
import { ROUTE_URL } from "routes";

function BestSellers() {
  const [books, setBooks] = useState([]);

  return (
    <div className="best-sellers">
      <div className="product-list-block">
        <div className="product-list-heading-block">
          <Link to={ROUTE_URL.SHOP}>Bestsellers</Link>
        </div>
        <div className="product-list_items">
          <ProductList col={4} bookList={[item, item, item, item]} />
        </div>
      </div>
      <div className="product-list-block">
        <div className="product-list-heading-block">
          <Link to={ROUTE_URL.SHOP}>New Arrivals</Link>
        </div>
        <div className="product-list_items">
          <ProductList col={4} bookList={[item, item, item, item]} />
        </div>
      </div>
    </div>
  );
}

export default BestSellers;

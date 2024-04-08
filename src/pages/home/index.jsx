import ProductList from "components/ProductList/ProductList";
import Banner from "components/pages/home/Banner/Banner";
import BestSellers from "components/pages/home/BestSellers/BestSellers";
import BookSlide from "components/pages/home/BookSlide/BookSlide";
import { IoChevronForward } from "react-icons/io5";
import image from "resources/images/joinCommunity.png";
import axios from "axios";
import { useState, useEffect } from "react";

export const getBook = async () => {
  const res = await axios.get("http://localhost:8080/api/books");
  return res.data;
};
function HomePage() {
  const [books, setBooks] = useState([]);
  const [mostView, setMostView] = useState([]);
  useEffect(() => {}, []);
  return (
    <div className="home-page">
      <Banner />
      <div className="home-page_inner">
        <BestSellers />
      </div>
    </div>
  );
}

export default HomePage;

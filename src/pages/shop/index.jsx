import ProductList from "components/ProductList/ProductList";
import { getBook } from "../home";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Empty } from "antd";

function ShopPage() {
  const { category } = useParams();
  // console.log(category);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (category) {
        const data = await axios.get(
          `http://localhost:8080/api/books/${category}`
        );

        setBooks(data.data);
      } else {
        const data = await getBook();
        setBooks(data);
      }
    };
    fetchData();
  }, [category]);
  return (
    <div className="shop-page">
      <div className="page-title">
        <h1>{category ? category : "Shop"}</h1>
      </div>
      <div className="book-container">
        {books.length > 0 ? (
          <ProductList col={4} bookList={books} noFlex />
        ) : (
          <Empty description="No book" />
        )}
      </div>
    </div>
  );
}

export default ShopPage;

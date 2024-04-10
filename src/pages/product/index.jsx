import { Carousel, Divider } from "antd";
import { useParams } from "react-router-dom";
import AddToCart from "components/pages/book-detail/components/AddToCart/AddToCart";
import { useGetBookDetail } from "hooks/useGetBookDetail";
import Comments from "components/pages/book-detail/components/Comments/Comments";
import { truncateString } from "utils";
import { round } from "utils";
import { item } from "constant/fakeData";
import { useState } from "react";
import ImageSlide from "components/pages/book-detail/components/ImageSlide";
import Rate from "components/Rate";

function ProductDetail() {
  const { slug } = useParams();
  const [selectedOption, setSelectedOption] = useState({
    id: "",
    name: "",
    price: "",
    quantity: "",
    featured_image: "",
    image: "",
  });
  const product = item;
  const listImg = [
    ...product.images,
    ...product.options.map((option) => ({ id: option.id, link: option.image })),
  ];
  return (
    <div className="product-detail">
      <div className="product-detail-content">
        <div className="product-detail_image">
          <ImageSlide listImg={listImg} selectedOption={selectedOption} />
        </div>
        <div className="product-detail-information">
          <h1 className="title">{product.name}</h1>
          <h2 className="price">${round(product.default_price, 2)} USD</h2>
          <div className="rate" style={{ display: "flex", gap: 20 }}>
            <Rate value={item?.rate} />
            <span className="ant-rate-text">{item?.rate}</span>
          </div>
          <Divider />
          <div className="product-options">
            <p className="product-options_name">
              <b>{product.variantName}</b>: {selectedOption.name}
            </p>
            <div className="product-options_items">
              {item.options.map((item) => (
                <div
                  className={`product-options_item ${
                    selectedOption.id == item.id ? "active" : ""
                  }`}
                  key={item.id}
                  onClick={() => {
                    setSelectedOption(item);
                  }}
                >
                  <img src={item.featured_image} alt="" />
                </div>
              ))}
            </div>
          </div>
          <div className="quantity">
            <p>Quantity</p>
            <AddToCart item={product} />
          </div>
          <div className="description-container">
            <h1>Description</h1>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
      <Comments bookid={product.id} />
    </div>
  );
}

export default ProductDetail;

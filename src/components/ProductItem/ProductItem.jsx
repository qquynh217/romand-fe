import { Carousel, Rate, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { round } from "utils";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { generateSlug } from "utils";

function ProductItem({ className = "", noFlex = false, item }) {
  const navigate = useNavigate();
  const goToProductDetail = () => {
    const slug = generateSlug(item.name);
    navigate(`/product/${slug}`);
  };

  const toggleOptions = () => {
    const slide = document.querySelector(".product-options");
    if (slide.classList.contains("cc-start")) {
      slide.classList.remove("cc-start");
      slide.classList.add("cc-end");
    } else {
      slide.classList.remove("cc-end");
      slide.classList.add("cc-start");
    }
  };

  return (
    <div className={`product-item ${className} ${noFlex ? "no-flex" : ""}`}>
      <div className="product-item_img" onClick={goToProductDetail}>
        <img src={item.images[0].link} alt="" className="thumb" />
        <Tag className="product-tag">New in</Tag>
      </div>
      <div className="product-item_info">
        <p className="title" onClick={goToProductDetail}>
          {item?.name}
        </p>
        <div>
          <Rate
            allowHalf
            defaultValue={item?.rate}
            disabled
            style={{ fontSize: 12 }}
          />
          <span className="ant-rate-text" style={{ fontSize: 12 }}>
            {item?.rate}
          </span>
        </div>
        <div className="product-item_price-options">
          <div className="product-options cc-start">
            <div className="product-options_inner">
              <div className="product-options_slide">
                {item.options.map((item) => (
                  <div className="product-options_item" key={item.id}>
                    <img src={item.featured_image} alt="" />
                  </div>
                ))}
              </div>
            </div>
            <div
              className="product-options_arrow forward"
              onClick={toggleOptions}
            >
              <IoIosArrowForward />
            </div>
            <div className="product-options_arrow back" onClick={toggleOptions}>
              <IoIosArrowBack />
            </div>
          </div>
          <p className="price">${round(item?.default_price, 2)} USD</p>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;

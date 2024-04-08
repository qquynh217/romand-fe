import { useNavigate } from "react-router-dom";

function SearchItem({ item }) {
  const navigate = useNavigate();
  const toBookDetail = () => {
    navigate(`/book/${item.slug}`);
  };
  return (
    <div className="search-item" onClick={toBookDetail}>
      <img
        src={`http://localhost:8080/api/image/${item.slug}`}
        className="search-item-image"
      />
      <div className="item-desc">
        <h2>{item.title}</h2>
        <p>{item.price}</p>
      </div>
    </div>
  );
}

export default SearchItem;

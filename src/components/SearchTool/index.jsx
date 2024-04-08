import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { getBook } from "pages/home";
import SearchItem from "./SearchItem";

function SearchTool() {
  const [showResult, setShowResult] = useState(false);
  const [allBooks, setAllBooks] = useState([]);
  const [filter, setFilter] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getBook();
      setAllBooks(data);
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const input = e.target.value.trim();
    if (input.length > 2) {
      const data = allBooks.filter((item) => {
        return item.title.toLowerCase().includes(input.toLowerCase());
      });
      setFilter(data);
    } else {
      setFilter([]);
    }
  };
  return (
    <div className="search-tool">
      <div
        className="search-tool-inner"
        onBlur={() => {
          setTimeout(() => {
            setShowResult(false);
          }, [300]);
        }}
      >
        <div className="search-product input-item">
          <input
            type="text"
            placeholder="Search products..."
            onFocus={() => {
              setShowResult(true);
            }}
            onChange={handleSearch}
          />
          <IoSearch className="search-icon" />
        </div>
        {showResult && (
          <div className="search-result-container">
            {filter.map((item, id) => {
              return <SearchItem item={item} key={id} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchTool;

import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthentication } from "store/useAuthentication";
import CommentCard from "../CommentCard/CommentCard";
import ReviewForm from "../ReviewForm/ReviewForm";
import { review as reviewInit } from "constant/fakeData";
import Rate from "components/Rate";

function Comments({ bookid }) {
  const { user } = useAuthentication();
  const [review, setReview] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      // const res = await axios.get(
      //   `http://localhost:8080/api/comments/${bookid}`
      // );
      setReview(reviewInit);
    };
    fetchData();
  }, [bookid]);
  return (
    <div className="comment-container">
      <h1>Customer Reviews</h1>
      <div className="rate-container">
        <div className="rate-average">
          <h2>{review.rate_avg}</h2>
          <div className="rate-average_info">
            <Rate value={review.rate_avg} />
            <p>Based on {review.comments.length} reviews</p>
          </div>
        </div>
      </div>
      <div className="comment-list">
        {review.comments?.map((item, key) => {
          return <CommentCard item={item} key={key} />;
        })}
      </div>
      {/* {user.isLogin && (
        <div className="review-form-wrapper">
          <ReviewForm bookid={bookid} />
        </div>
      )} */}
    </div>
  );
}

export default Comments;

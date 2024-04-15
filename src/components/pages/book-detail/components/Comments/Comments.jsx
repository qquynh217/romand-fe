import { Progress } from "antd";
import Rate from "components/Rate";
import { useEffect, useState } from "react";
import StarIcon from "resources/svg/Star";
import { productService } from "services/product";
import CommentCard from "../CommentCard/CommentCard";

function Comments({ bookid }) {
  const [review, setReview] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await productService.getProductFeedback({ lineId: bookid });
        if (res.status == 200) setReview(res.data.data);
      } catch (error) {}
    };
    fetchData();
  }, [bookid]);
  return (
    <div className="comment-container">
      <h1>Customer Reviews</h1>
      <div className="rate-container">
        <div className="rate-average">
          <h2>{review.rate_avg || 0}</h2>
          <div className="rate-average_info">
            <Rate value={review.rate_avg} />
            <p>Based on {review.comments?.length} reviews</p>
          </div>
        </div>
        <div className="star-distribution">
          {review.rates?.map((item, id) => (
            <div className="star-distribution-row">
              <p className="rate-star">{id + 1}</p>
              <StarIcon />
              <Progress
                strokeColor="#e7731bd1"
                showInfo={false}
                percent={
                  review.comments?.length
                    ? (item / review.comments.length) * 100
                    : 0
                }
              />
              <p className="rate-number">{item}</p>
            </div>
          ))}
        </div>
        <div className="rate-new-review-btn"></div>
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

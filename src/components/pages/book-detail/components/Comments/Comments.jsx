import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthentication } from "store/useAuthentication";
import CommentCard from "../CommentCard/CommentCard";
import ReviewForm from "../ReviewForm/ReviewForm";

function Comments({ bookid }) {
  const { user } = useAuthentication();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:8080/api/comments/${bookid}`
      );
      setComments(res.data);
    };
    if (bookid) {
      fetchData();
    }
  }, [bookid]);
  return (
    <div className="comment-container">
      <h1>Customer Reviews</h1>
      <div className="comment-list">
        {comments.map((item, key) => {
          return <CommentCard item={item} key={key} />;
        })}
      </div>
      {user.isLogin && (
        <div className="review-form-wrapper">
          <ReviewForm bookid={bookid} />
        </div>
      )}
    </div>
  );
}

export default Comments;

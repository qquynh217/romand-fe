import { Rate } from "antd";
import { useState } from "react";
import { useAuthentication } from "store/useAuthentication";
import { useReviewForm } from "../../hooks/useReviewForm";

function ReviewForm({ bookid }) {
  const { register, handleSubmit, errors, onSubmit, setStars } =
    useReviewForm(bookid);
  const { user } = useAuthentication();
  return (
    <form className="review-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="rate">
        <span>Your rating*</span>
        <Rate
          allowClear={false}
          allowHalf
          defaultValue={5}
          style={{ fontSize: 16 }}
          onChange={setStars}
        />
      </div>
      <textarea
        {...register("review")}
        className="input-item white"
        placeholder="Your review*"
      ></textarea>
      {errors.review && <p className="error-text">{errors.review?.message}</p>}
      {user.isLogin && <button className="app-button mg-10">Submit</button>}
    </form>
  );
}

export default ReviewForm;

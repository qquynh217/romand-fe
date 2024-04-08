import avatar from "resources/images/user-avatar.png";
import { Rate } from "antd";
import { avatarList } from "constant";
function CommentCard({ item }) {
  return (
    <div className="comment-card">
      <div className="user-avatar">
        <img src={avatarList[item.avatar - 1]} alt="" />
      </div>
      <div className="comment-info">
        <Rate allowHalf value={item.rate} disabled style={{ fontSize: 12 }} />
        <div className="name-date">
          <b className="user-name">{item.userName}</b>
          <span className="date">{item.timeUp}</span>
        </div>
        <p className="comment-content">{item.content}</p>
      </div>
    </div>
  );
}

export default CommentCard;

import { Avatar } from "antd";
import Rate from "components/Rate";
import { FaUser } from "react-icons/fa";
function CommentCard({ item }) {
  return (
    <div className="comment-card">
      <div className="user-info">
        <Avatar
          size={40}
          icon={<FaUser size={20} />}
          src={item.avatar || undefined}
        />
        <p className="user-name">{item.name}</p>
      </div>
      <div className="comment-info">
        <div className="rate-date">
          <Rate value={item.rate} />
          <span className="date">
            {new Date(item.createdAt).toLocaleString()}
          </span>
        </div>
        <div className="comment-content">
          <p className="comment-content">{item.content}</p>
        </div>
      </div>
    </div>
  );
}

export default CommentCard;

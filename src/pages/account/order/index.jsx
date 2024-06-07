import { Space, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { orderService } from "services/order";

const Order = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const res = await orderService.getOrder({ orderId: id });
      if (res.status == 200) {
        console.log(res.data.data);
        setOrder(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);
  return (
    <div className="order-detail">
      <div className="order-detail-header">
        <Button
          type="link"
          onClick={() => {
            navigate(-1);
          }}
        >
          {"<"} Back
        </Button>
        <Space>
          <p className="order-id">Order ID: {id}</p>
        </Space>
      </div>
    </div>
  );
};

export default Order;

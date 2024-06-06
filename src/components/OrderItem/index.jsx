import { Button, Popconfirm, Space, Table, message } from "antd";
import NumberFormat from "../NumberFormat";
import dayjs from "dayjs";
import { orderService } from "services/order";
import { ORDER_STATUS } from "constant";
import showMessage from "../Message";

const OrderItem = ({ order, fetchData }) => {
  const column = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
      align: "center",
      render: (_val, _rec, id) => <p>{id + 1}</p>,
    },
    {
      title: "Product",
      dataIndex: "id",
      key: "id",
      width: "45%",
      render: (_val, product) => (
        <div className="product-info">
          <img src={product.image} alt="" />
          <div>
            <p className="product-name">{product.name}</p>
            <p className="product-option">#{product.optionName}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Unit price",
      dataIndex: "price",
      key: "price",
      align: "center",
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      key: "qty",
      width: 115,
      align: "center",
    },
    {
      title: "Sub Total",
      dataIndex: "qty",
      key: "qty",
      align: "center",
      render: (val, rec) => (
        <p className="product-total">
          $<NumberFormat value={val * rec.price} />{" "}
        </p>
      ),
    },
  ];
  const handleCancel = async () => {
    try {
      const loading = showMessage("loading", "Loading...");
      const res = await orderService.updateOrderStatus({
        orderId: order.id,
        status: ORDER_STATUS[4].value,
      });
      if (res.status == 200) {
        message.destroy(loading);
        showMessage("success", "Order canceled successfully!");
        fetchData();
      }
    } catch (error) {
      message.destroy(loading);
      showMessage("error", "Cancel order failed!");
    }
  };
  return (
    <div className="purchase-order-item">
      <div className="order-header">
        <Space>
          <p>Order ID:</p>
          <b>{order.id}</b>
        </Space>
        <Space>
          <p>{dayjs(order.updatedAt).format("DD/MM/YYYY HH:mm:ss")}</p> |
          <p className="status">{order.newStatus}</p>
        </Space>
      </div>
      <Table
        columns={column}
        dataSource={order.products}
        className="cart-table"
        pagination={false}
      />
      <div className="total">
        <div>
          {order.newStatus == "Processing" && (
            <Popconfirm
              title="Cancel Order?"
              description="Are you sure to cancel this order?"
              onConfirm={handleCancel}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary">Cancel</Button>
            </Popconfirm>
          )}
        </div>
        <Space>
          <p>Total:</p>
          <b>${order.totalPrice}</b>
        </Space>
      </div>
    </div>
  );
};
export default OrderItem;

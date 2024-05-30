import { Button, Input, Space, Table } from "antd";
import { CartContext } from "context/CartContext";
import { useContext, useEffect } from "react";
import NumberFormat from "components/NumberFormat";
import { useAuthentication } from "store/useAuthentication";
import { useNavigate } from "react-router-dom";
import { ROUTE_URL } from "routes";

function Cart() {
  const {
    cartItems,
    handleCheckout,
    fetchData,
    setSelectedItems,
    totalPrice,
    totalQuantities,
    selectedItemsKey,
    toggleQuantity,
  } = useContext(CartContext);
  const navigate = useNavigate();
  const { id } = useAuthentication();
  const column = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      width: "45%",
      render: (product) => (
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
      dataIndex: "product",
      key: "product",
      align: "center",
      render: (product) => <p>${product.price}</p>,
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      key: "qty",
      width: 115,
      align: "center",
      render: (val, rec) => (
        <Space className="product-qty-input">
          <Button
            onClick={() => {
              toggleQuantity(rec.id, "-");
            }}
          >
            -
          </Button>
          <Input value={val} />
          <Button
            onClick={() => {
              toggleQuantity(rec.id, "+");
            }}
          >
            +
          </Button>
        </Space>
      ),
    },
    {
      title: "Total",
      dataIndex: "qty",
      key: "qty",
      align: "center",
      render: (val, rec) => (
        <p className="product-total">
          $<NumberFormat value={val * rec.product.price} />{" "}
        </p>
      ),
    },
    {
      title: "Actions",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: 100,
      render: (val) => (
        <Button type="link" danger>
          Delete
        </Button>
      ),
    },
  ];
  useEffect(() => {
    if (id) fetchData(id);
  }, [id]);
  const rowSelection = {
    onChange: (_selectedRowKeys, selectedRows) => {
      setSelectedItems(selectedRows);
    },
  };

  return (
    <div className="cart">
      <h1 className="title">Cart</h1>
      <div className="cart-item-container">
        <Table
          columns={column}
          dataSource={cartItems}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
            selectedRowKeys: selectedItemsKey,
          }}
          pagination={false}
          className="cart-table"
        />
      </div>
      <div className="total">
        <Space className="total-amount">
          <h2>
            Total (<NumberFormat value={totalQuantities} /> items):
          </h2>{" "}
          <h1 className="amount">
            $<NumberFormat value={totalPrice} />{" "}
          </h1>
        </Space>
        <button
          className="app-button"
          onClick={() => {
            navigate(ROUTE_URL.CHECKOUT);
          }}
        >
          <span>Check out</span>
        </button>
      </div>
    </div>
  );
}

export default Cart;

import {
  Form,
  Table,
  Space,
  Input,
  Button,
  Radio,
  Select,
  Row,
  Col,
} from "antd";
import { useContext, useEffect, useState } from "react";
import SelectAddressModal from "components/pages/checkout/AddressModal";
import { cartService } from "services/cart";
import { useAuthentication } from "store/useAuthentication";
import { CartContext } from "context/CartContext";
import { initAddress } from "../account/address";
import NumberFormat from "components/NumberFormat";
import { BsTicketPerforated } from "react-icons/bs";
import { shipping } from "constant/fakeData";
import { FaShippingFast } from "react-icons/fa";
import { payment } from "constant/fakeData";
import { voucher } from "constant/fakeData";

function Checkout() {
  const [address, setAddress] = useState(initAddress);
  const [info, setInfo] = useState({
    shippingValue: 0,
    voucher: 0,
  });
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { id } = useAuthentication();
  const { selectedItems, totalPrice, totalQuantities } =
    useContext(CartContext);
  const getListAddress = async () => {
    try {
      const res = await cartService.listAddress({ customer_id: id });
      setAddress(res.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (value) => {
    const data = {
      ...value,
      addressId: address.id,
      products: selectedItems,
    };
    console.log(data);
  };

  useEffect(() => {
    getListAddress();
  }, [id]);
  const column = [
    {
      title: <h2 className="table-title">Product Ordered</h2>,
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
      width: "10%",
      render: (product) => <p>${product.price}</p>,
    },
    {
      title: "Amount",
      dataIndex: "qty",
      key: "qty",
      width: "10%",
      align: "center",
    },
    {
      title: "Sub Total",
      dataIndex: "qty",
      key: "qty",
      align: "center",
      width: "10%",
      render: (val, rec) => (
        <p className="product-total">
          $<NumberFormat value={val * rec.product.price} />{" "}
        </p>
      ),
    },
  ];

  return (
    <div className="checkout">
      <h1 className="title">Checkout</h1>
      <Form form={form} onFinish={handleSubmit}>
        <div className="delivery-address-border" />
        <div className="delivery-address">
          <h2>Delivery Address</h2>
          <Space>
            <Space className="address-info">
              <b>
                {address.name} | {address.phone}
              </b>
              <p>{address.address}</p>
            </Space>
            <Button
              type="link"
              onClick={() => {
                setOpen(true);
              }}
            >
              Change
            </Button>
          </Space>
        </div>
        <div className="product-ordered">
          <Table
            columns={column}
            dataSource={selectedItems}
            className="cart-table"
            pagination={false}
          />
          <Space className="total">
            <p>Order Total ({totalQuantities} items):</p>
            <b>${totalPrice}</b>
          </Space>
        </div>
        <div className="shipping-voucher">
          <div className="shipping">
            <div className="shipping-total">
              <h2>Shipping Option:</h2>
              <b>${info.shippingValue}</b>
            </div>
            <Form.Item name="shippingTypeId">
              <Radio.Group
                onChange={(e) => {
                  e = e.target.value;
                  const data = shipping.find((item) => item.id == e);
                  setInfo((prev) => ({ ...prev, shippingValue: data.value }));
                }}
              >
                {shipping.map((item) => (
                  <Radio value={item.id}>
                    <div className="shipping-item">
                      <Space>
                        <FaShippingFast
                          size={16}
                          style={{ marginTop: 6 }}
                          color="#26aa99"
                        />
                        <p>
                          {item.name} - {item.value}$
                        </p>
                      </Space>
                      <p className="desc">{item.description}</p>
                    </div>
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </div>
          <div className="voucher">
            <div className="voucher-title">
              <BsTicketPerforated size={20} />
              <h2>Voucher</h2>
            </div>
            <div className="voucher-input">
              <Form.Item name="voucherId">
                <Select
                  style={{ width: "300px" }}
                  options={voucher.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                  onChange={(e) => {
                    console.log(e);
                    const data = voucher.find((item) => item.id == e);
                    setInfo((prev) => ({
                      ...prev,
                      voucher: data.discountPercent
                        ? totalPrice * data.discountPercent
                        : data.discountAmount,
                    }));
                  }}
                ></Select>
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="payment">
          <div className="payment-method">
            <h2>Payment method</h2>
            <Select options={payment} style={{ width: "300px" }}></Select>
          </div>
          <div className="total">
            <Row>
              <Col span={18}></Col>
              <Col span={3}>
                <div className="total-name">
                  <p>Merchandise Subtotal:</p>
                  <p>Shipping Total:</p>
                  <p>Voucher Discount:</p>
                  <p>Total Payment:</p>
                </div>
              </Col>
              <Col span={3}>
                <div className="total-value">
                  <p>${totalPrice}</p>
                  <p>${info.shippingValue}</p>
                  <p>-${info.voucher}</p>
                  <h2>${totalPrice + info.shippingValue - info.voucher}</h2>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={18}></Col>
              <Col span={6}>
                <Button type="primary" className="btn-order" htmlType="submit">
                  Place Order
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </Form>
      <SelectAddressModal
        isOpen={open}
        setIsOpen={setOpen}
        address={address}
        setAddress={setAddress}
      />
    </div>
  );
}

export default Checkout;

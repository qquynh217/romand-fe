import { API_URL, axiosCus } from "../axios";

class OrderService {
  baseUrl = API_URL + "/order";

  getShippingType() {
    return axiosCus.post(this.baseUrl + "/shippingType");
  }
  getVoucher({ customerId }) {
    return axiosCus.post(this.baseUrl + "/getVoucherOrder", { customerId });
  }
  createOrder(params) {
    return axiosCus.post(this.baseUrl + "/createOrder", params);
  }
}

export const orderService = new OrderService();

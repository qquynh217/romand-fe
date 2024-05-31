import { API_URL, axiosCus } from "../axios";

class OrderService {
  baseUrl = API_URL + "/order";

  getShippingType() {
    return axiosCus.post(this.baseUrl + "/shippingType");
  }
}

export const orderService = new OrderService();

import axios from "axios";
import { API_URL } from "../axios";

class CartService {
  baseUrl = API_URL + "/cart";
  addToCart({ customer_id, product_id, qty, totalPrice }) {
    return axios.post(this.baseUrl + "/addProductToCart", {
      customer_id,
      product_id,
      qty,
      totalPrice,
    });
  }
  viewCart({ customer_id }) {
    return axios.post(this.baseUrl + "/viewCart", { customer_id });
  }
}

export const cartService = new CartService();

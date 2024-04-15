import axios from "axios";
import { API_URL } from "../axios";

class ProductService {
  baseUrl = API_URL + "/product";
  getListByCatagory(params) {
    const { category } = params;
    return axios.post(this.baseUrl + "/getProductByCategory", { category });
  }
  getProduct(params) {
    const lineId = params.id;
    return axios.post(this.baseUrl + "/viewProduct", { lineId });
  }
  getProductFeedback(params) {
    const lineId = params.lineId;
    return axios.post(this.baseUrl + "/getFeedback", { lineId });
  }
}

export const productService = new ProductService();

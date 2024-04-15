import axios from "axios";
import { API_URL } from "../axios";

class UserService {
  baseUrl = API_URL + "/user";
  signUp(params) {
    return axios.post(this.baseUrl + "/signup", params);
  }
  login(params) {
    return axios.post(this.baseUrl + "/login", params);
  }
  changeInfo(params) {
    return axios.post(this.baseUrl + "/changeInfo", {
      ...params,
      customer_id: params.id,
    });
  }
}

export const userService = new UserService();

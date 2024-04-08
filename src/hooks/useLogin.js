import { REGEX_PASSWORD } from "constant";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuthentication } from "store/useAuthentication";
import axios from "axios";
import { useContext } from "react";
import { CartContext } from "context/CartContext";

const getUser = async (data) => {
  const user = await axios
    .post("http://localhost:8080/api/user/login", {
      username: "",
      email: data.email,
      pass: data.password,
    })
    .catch((error) => {
      return null;
    });
  return user;
};
export const useLogin = (closeModal) => {
  const { login } = useAuthentication();
  const { fetchData } = useContext(CartContext);
  const schema = yup.object({
    email: yup.string().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .matches(REGEX_PASSWORD, {
        message:
          "Password must contain at least 8 characters, 1 letter and 1 number",
      }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    console.log(data);
    const res = await getUser(data);
    if (res) {
      const user = {
        email: res.data.email,
        name: res.data.username,
        id: res.data.id,
        role: res.data.userrole,
        avatar: res.data.avatar,
      };
      console.log(user);
      login(user);
      fetchData(user.id);
      closeModal();
    } else {
      setError("password", { message: "Password or email wrong" });
    }
  };
  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};

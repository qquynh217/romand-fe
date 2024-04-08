import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { REGEX_EMAIL, REGEX_PASSWORD } from "constant";
import { message } from "antd";
import axios from "axios";

export const useSignup = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const schema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required").matches(REGEX_EMAIL, {
      message: "Invalid email",
    }),
    password: yup
      .string()
      .required("Password is required")
      .matches(REGEX_PASSWORD, {
        message:
          "Password must contain at least 8 characters, 1 letter and 1 number",
      }),
    confirm: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Your passwords do not match."),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    const status = await axios
      .post("http://localhost:8080/api/user", {
        email: data.email,
        username: data.name,
        pass: data.password,
      })
      .catch((error) => {
        console.log("error", error.response.data);
        setError("email", { message: error.response.data });
      });
    if (status?.status == 200) {
      messageApi.success("Created successfully");
      reset();
    }
  };
  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    contextHolder,
  };
};

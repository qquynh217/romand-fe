import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuthentication } from "store/useAuthentication";
import { useState } from "react";
import { message } from "antd";
import axios from "axios";
import toast from "react-hot-toast";

export const useChangeProfile = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = useAuthentication();
  const [ava, setAva] = useState(() => (user.avatar ? user.avatar - 1 : 0));
  const { changeInfo } = useAuthentication();
  const handleChangeAva = () => {
    if (ava < 5) {
      setAva((prev) => prev + 1);
    } else {
      setAva(0);
    }
  };
  const schema = yup.object({
    name: yup.string().required("Name is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: user.name },
  });
  const onSubmit = async (data) => {
    const info = {
      name: data.name,
      avatar: ava + 1,
    };

    await axios
      .put("http://localhost:8080/api/user", {
        id: user.id,
        ...info,
      })
      .then((res) => {
        if (res.data == 409) {
          toast.error("User name is exists!");
        } else {
          changeInfo(info);
          messageApi.success("Saved !");
        }
      });
  };
  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    ava,
    handleChangeAva,
    user,
    contextHolder,
  };
};

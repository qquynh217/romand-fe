import { useEffect, useState } from "react";
import { orderService } from "services/checkout";

export const useCheckOut = () => {
  const [shipping, setShipping] = useState([]);
  const getShippingType = async () => {
    try {
      const res = await orderService.getShippingType();
      if (res.status == 200) {
        setShipping(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getShippingType();
  }, []);
  return {
    shipping,
  };
};

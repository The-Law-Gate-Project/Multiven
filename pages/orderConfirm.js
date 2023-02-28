import Link from "next/link";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

const OrderConfirm = () => {
  const { fname } = useSelector((store) => store.user);
  return (
    <div>
      {fname} Have to Pay this much amount now after delivery
      <Link href="/" passHref>
        <button>Home</button>
      </Link>
    </div>
  );
};

export default OrderConfirm;

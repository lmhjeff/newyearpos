"use client";

import { CubeTransparentIcon } from "@heroicons/react/24/outline";
import { Select, Spin, message } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import useCartStore from "../app/store";
import useWindowDimensions from "../hook/useWindowDimension";
import ModalForm from "./ModalForm";

type CartInput = {
  products: Product[];
  subTotal: number;
  discount: string;
  total: number;
  paymentMethod: string;
  address?: string;
  email: string;
};

const Cart = () => {
  const { removeFromCart } = useCartStore();
  const cart = useCartStore((state) => state.cart);
  const subTotal = useCartStore((state) => state.subTotal);
  const reset = useCartStore((state) => state.reset);
  const [discount, setDiscount] = useState("sellingPrice");
  const [total, setTotal] = useState<number>(0);
  const [discountPrice, setDiscountPrice] = useState<number | any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const addressRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  const { height } = useWindowDimensions();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [order, setOrder] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CartInput>();

  useEffect(() => {
    const calculation = () => {
      if (discount === "sellingPrice") {
        setTotal(subTotal - discountPrice);
      } else {
        setTotal(subTotal * discountPrice);
      }
    };

    calculation();
  }, [discount, discountPrice]);

  useEffect(() => {
    setTotal(subTotal);
  }, [subTotal]);

  const onSubmit: SubmitHandler<CartInput> = async (data) => {
    setLoading(true);
    setOrder("order");
    const orderItems = cart.map((item: any) => ({
      _key: item._id,
      name: item.name,
      orderQty: item.orderQty,
      image: item.image,
      price: item.price,
    }));

    const order = {
      ...data,
      orderItems: orderItems,
      subTotal: subTotal,
      discount: discount,
      discountPrice: discountPrice ?? "0",
      paymentMethod: data.paymentMethod,
      total: total,
      preOrder: false,
      createdAt: new Date().toISOString(),
      address: addressRef?.current?.value,
      status: "Completed",
    };

    fetch("/api/createOrder", {
      method: "POST",
      body: JSON.stringify(order),
    }).then(() => {
      message.success("💰Place Order Successfully!");
      reset();
      setDiscount("sellingPrice");
      setDiscountPrice(0);
      setLoading(false);
      setOrder("");
    });

    fetch("/api/reduceQty", {
      method: "POST",
      body: JSON.stringify(orderItems),
    }).then(() => {
      console.log("reduced");
    });
  };

  const handlePreOrder = (data: any) => {
    if (
      !usernameRef.current?.value ||
      !phoneNumberRef.current?.value ||
      !emailRef.current?.value
    ) {
      setError(true);
      return;
    }

    setLoading(true);
    setOrder("preOrder");
    const orderItems = cart.map((item: any) => ({
      _key: item._id,
      name: item.name,
      orderQty: item.orderQty,
      image: item.image,
      price: item.price,
    }));

    const order = {
      ...data,
      orderItems: orderItems,
      subTotal: subTotal,
      discount: discount,
      discountPrice: discountPrice ?? 0,
      paymentMethod: data.paymentMethod,
      total: total,
      preOrder: true,
      createdAt: new Date().toISOString(),
      address: addressRef?.current?.value,
      status: "PreOrder",
      username: usernameRef?.current?.value,
      phoneNumber: Number(phoneNumberRef?.current?.value),
      email: emailRef?.current?.value,
    };

    fetch("/api/createPreOrder", {
      method: "POST",
      body: JSON.stringify(order),
    }).then((res) => {
      message.success("✉️Email Sent!");
      reset();
      setDiscount("sellingPrice");
      setDiscountPrice(0);
      setLoading(false);
      setOrder("");
    });

    setError(false);
    setOpen(false);
  };

  const handleDiscount = (value: string) => {
    setDiscount(value);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div
      className={`flex flex-col w-[30%] min-w-[350px] m-4 h-[${height}px] ${
        cart.length > 0 ? "items-start" : "justify-center"
      } `}
    >
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-[#2d2d2d] h-full rounded-lg">
          <CubeTransparentIcon className="h-8 w-8 text-gray-400" />
          <div className="text-gray-400 text-center">NO ITEM ADDED!!</div>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full pb-2 h-full overflow-scroll relative">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex flex-col items-center space-y-3 w-full h-[230px] overflow-y-scroll scrollbar-none">
              {cart.length > 0
                ? cart?.map((item, i) => (
                    <div
                      key={item._id}
                      className="flex flex-row justify-between items-center w-full bg-[#2d2d2d] text-md text-white p-4 rounded-md space-x-4"
                    >
                      <div className="flex justify-center items-center bg-white w-6 h-6 rounded-full text-[#2d2d2d]">
                        {i + 1}
                      </div>
                      <div className="flex-1 break-all">
                        {item.name} x {item.orderQty}
                      </div>
                      <div className=" break-all">@ ${item.price}</div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="flex justify-center items-center bg-red-500 w-6 h-6 pb-1 rounded-full text-center"
                      >
                        x
                      </button>
                    </div>
                  ))
                : null}
            </div>
            <div className="flex flex-col w-full justify-between items-center bg-[#2d2d2d] rounded-md  absolute bottom-0 p-4 space-y-2">
              <div className="flex flex-col space-y-3 w-full">
                <div className="flex flex-row w-full justify-between items-center">
                  <p>Subtotal</p>
                  <p>${subTotal}</p>
                </div>
                <div className="flex flex-row w-full justify-between items-center">
                  <Select
                    className="bg-transparent w-1/3"
                    onChange={handleDiscount}
                    defaultValue="sellingPrice"
                    options={[
                      {
                        value: "discount",
                        label: "discount",
                        disabled: true,
                      },
                      {
                        value: "sellingPrice",
                        label: "減價",
                      },
                      {
                        value: "percentage",
                        label: "折扣 %",
                      },
                    ]}
                  />

                  <input
                    id="discountPrice"
                    onChange={(e) => setDiscountPrice(e.target.value)}
                    className="bg-transparent w-[100px] p-2 border-[1px] border-white rounded-lg text-right"
                    defaultValue={0}
                    // type="number"
                  />
                </div>
                <hr className="border-dashed border-1 border-white w-full" />
                <div className="flex flex-row w-full justify-between items-center my-2 text-3xl font-semibold">
                  <p>Total</p>
                  <p>${total?.toFixed(2)}</p>
                </div>

                <input
                  id="address"
                  ref={addressRef}
                  className="text-blue-500 rounded-lg p-2 w-full focus:border-2 border-green-300"
                  placeholder="input address"
                />
              </div>
              <div className="flex flex-col w-full mt-8 space-y-4">
                <h3>Payment Method</h3>
                {errors.paymentMethod?.type === "required" && (
                  <p role="alert" className="text-red-400">
                    Payment method is required!!!
                  </p>
                )}
                <div className="flex flex-row w-full justify-between">
                  <ul className="grid grid-cols-3 gap-3 items-center w-full">
                    <li className="relative">
                      <input
                        {...register("paymentMethod", { required: true })}
                        id="cash"
                        type="radio"
                        value="CASH"
                        name="paymentMethod"
                        className="peer text-black hidden"
                      />

                      <label
                        htmlFor="cash"
                        className="flex cursor-pointer border-white border-[1px] justify-center items-center px-4 py-2 rounded-lg w-full peer-checked:bg-white peer-checked:text-black text-lg  "
                      >
                        CASH
                      </label>
                    </li>
                    <li className="relative">
                      <input
                        {...register("paymentMethod", { required: true })}
                        id="payme"
                        type="radio"
                        value="PAYME"
                        name="paymentMethod"
                        className="peer text-black hidden"
                      />
                      <label
                        htmlFor="payme"
                        className="flex cursor-pointer border-white border-[1px]  justify-center items-center px-4 py-2 rounded-lg w-full peer-checked:bg-white peer-checked:text-black text-lg  "
                      >
                        PAYME
                      </label>
                    </li>
                    <li className="relative">
                      <input
                        {...register("paymentMethod", { required: true })}
                        id="fps"
                        type="radio"
                        value="FPS"
                        name="paymentMethod"
                        className="peer text-black hidden"
                      />
                      <label
                        htmlFor="fps"
                        className="flex cursor-pointer border-white border-[1px]  justify-center items-center px-4 py-2 rounded-lg w-full peer-checked:bg-white peer-checked:text-black text-lg  "
                      >
                        FPS
                      </label>
                    </li>
                    <li className="relative grow">
                      <input
                        {...register("paymentMethod", { required: true })}
                        id="octopus"
                        type="radio"
                        value="OCTOPUS"
                        name="paymentMethod"
                        className="peer text-black hidden"
                      />

                      <label
                        htmlFor="octopus"
                        className="flex cursor-pointer border-white border-[1px] justify-center items-center px-4 py-2 rounded-lg w-full peer-checked:bg-white peer-checked:text-black text-lg  "
                      >
                        OCTOPUS
                      </label>
                    </li>
                    <li className="relative grow">
                      <input
                        {...register("paymentMethod", { required: true })}
                        id="tapgo"
                        type="radio"
                        value="TAPGO"
                        name="paymentMethod"
                        className="peer text-black hidden"
                      />

                      <label
                        htmlFor="tapgo"
                        className="flex cursor-pointer border-white border-[1px] justify-center items-center px-4 py-2 rounded-lg w-full peer-checked:bg-white peer-checked:text-black text-lg  "
                      >
                        TAPnGO
                      </label>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-row justify-between items-center space-x-4">
                  <button
                    disabled={loading}
                    // type="submit"
                    className="bg-green-300 disabled:bg-gray-200 w-full rounded-3xl p-4 font-semibold text-lg text-gray-700"
                  >
                    {loading && order === "order" ? <Spin /> : "Place Order"}
                  </button>
                  <>
                    <div
                      onClick={() => setOpen(!open)}
                      className="bg-orange-400 w-full text-center rounded-3xl p-4 font-semibold text-lg text-gray-700"
                    >
                      {loading && order === "preOrder" ? <Spin /> : "Pre Order"}
                    </div>
                    <ModalForm
                      open={open}
                      setOpen={setOpen}
                      usernameRef={usernameRef}
                      phoneNumberRef={phoneNumberRef}
                      emailRef={emailRef}
                      error={error}
                      handleCancel={handleCancel}
                      handleSubmitPreOrder={handleSubmit(handlePreOrder)}
                    />
                  </>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Cart;



import CheckoutWizard from "@/components/CheckoutWizard";
import Layout from "@/components/Layout";
import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { Store } from "@/utils/Store";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Payment() {
  const [selectPaymentMethod, setSelectPaymentMethod] = useState("");
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymemtMethod } = cart;
  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectPaymentMethod) {
      return toast.error("Please select payment method");
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectPaymentMethod });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectPaymentMethod,
      })
    );
    router.push("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push("/shipping");
    }
    setSelectPaymentMethod(paymemtMethod || "");
  }, [paymemtMethod, router, shippingAddress.address]);
  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2} />
      <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <h1 className="mb-4 text-xl">Payment Method</h1>
        {["Paypal", "Stripe", "Cash"].map((payment) => (
          <div key={payment} className="mb-4">
            <input
              type="radio"
              id={payment}
              name="paymentMethod"
              checked={selectPaymentMethod === payment}
              onChange={() => setSelectPaymentMethod(payment)}
              className="p-2 outline-none focus:ring-0"
            />
            <label htmlFor={payment} className="p-2">
              {payment}
            </label>
          </div>
        ))}
        <div className="mb-4 flex justify-between">
          <button
            type="button"
            className="default-button"
            onClick={() => router.push("/shipping")}
          >
            Back
          </button>
          <button type="submit" className="primary-button">
            Next
          </button>
        </div>
      </form>
    </Layout>
  );
}

payment.auth = true;

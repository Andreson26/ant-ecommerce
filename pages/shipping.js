import CheckouWizard from "@/components/CheckouWizard";
import Layout from "@/components/Layout";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Store } from "@/utils/Store";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function shipping() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue("fullName", shippingAddress?.fullName);
    setValue("address", shippingAddress?.address);
    setValue("city", shippingAddress?.city);
    setValue("postalCode", shippingAddress?.postalCode);
    setValue("country", shippingAddress?.country);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: { fullName, address, city, postalCode, country },
      })
    );
    router.push("/payment");
  };

  return (
    <Layout title="Shipping Address">
      <CheckouWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Shipping Address</h1>
        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            className="w-full"
            autoFocus
            {...register("fullName", { required: "please enter full name" })}
          />
          {errors.fullName && (
            <p className="text-red-500">{errors.fullName.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            className="w-full"
            {...register("address", {
              required: "please enter address",
              minLength: { value: 3, message: "Address is more than 2 chars" },
            })}
          />
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city">City</label>
          <input
            id="city"
            className="w-full"
            {...register("city", { required: "please enter city" })}
          />
          {errors.city && <p className="text-red-500">{errors.city.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            id="postalCode"
            className="w-full"
            {...register("postalCode", {
              required: "please enter postal code",
            })}
          />
          {errors.postalCode && (
            <p className="text-red-500">{errors.postalCode.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="country">Country</label>
          <input
            id="country"
            className="w-full"
            {...register("country", { required: "please enter country" })}
          />
          {errors.country && (
            <p className="text-red-500">{errors.country.message}</p>
          )}
        </div>
        <div className="mb-4 flex-between">
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}

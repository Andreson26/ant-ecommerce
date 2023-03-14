import React, { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { getError } from "@/utils/error";
import Layout from "@/components/Layout";

export default function profile() {
  const { data: session } = useSession();

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("name", session.user.name);
    setValue("email", session.user.email);
  }, [session.user, setValue]);

  const submitHandler = async ({ name, email, password }) => {
    try {
      const { data } = await axios.put("/api/auth/update", {
        name,
        email,
        password,
      });
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      toast.success("Profile updated successfully");
      if (result.error) toast.error(result.error);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Profile">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-lx"> Update Profile</h1>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: "Please enter your name",
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-sm appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Please enter your email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-sm appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", {
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-sm appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              validate: (value) => value === getValues("password"),
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-sm appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === "validate" && (
              <p className="text-xs text-red-500">Passwords do not match</p>
            )}
        </div>
        <div className="mb-4">
          <button type="submit" className="primary-button">
            Update Profile
          </button>
        </div>
      </form>
    </Layout>
  );
}

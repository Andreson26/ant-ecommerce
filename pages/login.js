import Layout from "@/components/Layout";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = ({ email, password }) => {
    console.log(email, password);
  };

  return (
    <Layout title="login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-lx">Login</h1>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            {...register("email", {
                required:"please enter your email",
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address"
                },
            })}
            id="email"
            name="email"
            autoFocus
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
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
            {...register("password", {
                required: "please enter your password",
                minLength: { value: 6, message: "password must be at least 6 characters" },
            })}
            id="password"
            name="password"
            autoFocus
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        
        <div className="mb-4">
          <button className="primary-button">Login</button>
        </div>
        <div className="mb-4">
          Don&apos;t have an account? <Link href="/register">Register</Link>
        </div>
      </form>
    </Layout>
  );
}

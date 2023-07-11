"use client";

import { FunctionComponent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { SignCredentialsType } from "@/client/interfaces";
import { signUpUser } from "@/client/query-fns";

export const Register: FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignCredentialsType>({ defaultValues: { email: "", password: "" } });

  const signUpMutation = useMutation(signUpUser, {
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit: SubmitHandler<SignCredentialsType> = (data) => {
    signUpMutation.mutate(data);
  };

  return (
    <div>
      <h2 className="mb-4 font-bold">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            id="email"
            {...register("email", {
              required: { value: true, message: "Required field" },
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
            })}
            className="rounded border border-neutral-400 px-2"
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: { value: true, message: "Required field" },
            })}
            className="rounded border border-neutral-400 px-2"
          />
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        </div>
        <button type="submit" className="rounded bg-blue-600 p-2 text-white">
          {signUpMutation.isLoading ? "Loading..." : "Sign up"}
        </button>
      </form>
      {signUpMutation.isSuccess && <span>Email has been sent</span>}
      {signUpMutation.isError && <span className="text-red-500">Error</span>}
    </div>
  );
};

export default Register;

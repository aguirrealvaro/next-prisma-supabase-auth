"use client";

import { FunctionComponent } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { SignCredentialsType } from "@/client/interfaces";
import { signInUser } from "@/client/query-fns";

export const Login: FunctionComponent = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignCredentialsType>({ defaultValues: { email: "", password: "" } });

  const signInMutation = useMutation(signInUser, {
    onSuccess: () => {
      reset();
      router.refresh();
      router.push("/");
    },
  });

  const onSubmit: SubmitHandler<SignCredentialsType> = (data) => {
    signInMutation.mutate(data);
  };

  const supabase = createClientComponentClient();

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `http://localhost:3000/api/auth/callback`,
      },
    });
  };

  return (
    <div>
      <h2 className="mb-4 font-bold">Login</h2>
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
          {signInMutation.isLoading ? "Loading..." : "Sign in"}
        </button>
      </form>
      {signInMutation.isError && <span className="text-red-500">Error</span>}
      <div className="mt-12">
        <button className="rounded bg-teal-500 p-4 text-black" onClick={handleGoogleSignIn}>
          Google sign in
        </button>
      </div>
    </div>
  );
};

export default Login;

"use client";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { loginUser } from "@/api/authAPI";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/authSlice";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(3, "Password is of atleast 6 characters"),
});

type loginData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginData>({ resolver: zodResolver(loginSchema) });

  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (data: loginData) => {
    try {
      setServerError(null);
      const res = await loginUser(data);
      //localStorage.setItem("token", res.token);
      // setCookie("token", res.token, {
      //   maxAge: 60 * 60,
      //   path: "/",
      // });
      dispatch(setCredentials(res));
      router.push("/dashboard");
    } catch (error: unknown) {
      console.log("Error occoured with signup -> ", error);
      setServerError(error instanceof Error ? error.message : "Signup Failed");
    }
  };

  return (
    <form
      className="space-y-4 mt-6 ml-8 mr-8 mb-5 flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <>
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 rounded-lg border-2 border-amber-700 text-emerald-950"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </>

      <>
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 rounded-lg border-2 border-amber-700 text-emerald-950"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </>

      {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-amber-100 rounded-md p-2 m-auto"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing Up!" : "Sign Up!"}
      </button>
    </form>
  );
};

export default LoginForm;

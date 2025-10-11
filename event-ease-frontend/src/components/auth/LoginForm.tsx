"use client";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { loginUser } from "@/api/authAPI";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/authSlice";
import { setCookie } from "cookies-next";

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

      dispatch(setCredentials({ token: res.token, user: res.user }));
      setCookie("token", res.token, { maxAge: 60 * 60, path: "/" });
      setCookie("user", res.user);
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
          className="w-full px-4 py-2 rounded-lg border-2 border-amber-700 text-blue-700"
          autoComplete="email"
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
          className="w-full px-4 py-2 rounded-lg border-2 border-amber-700 text-blue-700"
          autoComplete="password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </>

      {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

      <button
        type="submit"
        className={`w-full bg-blue-600 text-amber-100 rounded-md p-2 hover:bg-black hover:text-amber-50 font-bold ${
          isSubmitting ? `bg-amber-950!` : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Loging In!" : "Login!"}
      </button>

      <div className="text-center text-amber-700 mb-0.5">
        Do not have an existing account with us?
      </div>
      <button
        className="w-full bg-cyan-800 font-bold rounded-md p-1.5 hover:bg-fuchsia-900 hover:text-black"
        type="button"
        onClick={() => {
          router.push("/signup");
        }}
      >
        Sign Up!
      </button>
    </form>
  );
};

export default LoginForm;

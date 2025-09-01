"use client";

import { useState } from "react";
import { registerUser } from "@/api/authAPI";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signupSchema = z.object({
  name: z.string().min(3, "Name must be of atleast 3 Characters"),
  email: z.email(),
  password: z.string().min(6, "Password Must be of atlease 6 Characters"),
});

type SignupData = z.infer<typeof signupSchema>;

const SignupFrom = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (data: SignupData) => {
    try {
      setServerError(null);

      const res = await registerUser(data);

      localStorage.setItem("token", res.token);

      router.push("/login");
    } catch (error: unknown) {
      console.log("Error occoured with signup -> ", error);
      setServerError(error instanceof Error ? error.message : "Signup Failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 mt-6 ml-8 mr-8 mb-5 flex-col"
    >
      {/* Name input field */}

      <>
        <input
          {...register("name")}
          type="text"
          placeholder="Name"
          className="w-full px-4 py-2 rounded-lg border-2 border-amber-700 text-emerald-950"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </>
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

export default SignupFrom;

import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-600">
      <div className="w-full max-w-md pd-6 bg-white shadow-lg rounded-2xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-emerald-950">
          Log into your account!
        </h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

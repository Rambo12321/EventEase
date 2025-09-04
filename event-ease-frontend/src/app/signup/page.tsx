import SignupForm from "@/components/auth/SignupForm";

const SignupPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-600">
      <div className="w-full max-w-md pd-6 bg-white shadow-lg rounded-2xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-emerald-950">
          Create an account!
        </h1>
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;

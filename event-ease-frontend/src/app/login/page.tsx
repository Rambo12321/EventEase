import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="loginContainer">
      <div className="max-w-md p-8 glassEffect rounded-2xl h-[23rem] w-[55rem]">
        <h1 className="text-2xl font-bold text-center mb-6 text-shadow-white">
          Log into your account!
        </h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

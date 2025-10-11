import SignupForm from "@/components/auth/SignupForm";

const SignupPage = () => {
  return (
    <div className="signupContainer">
      <div className="wave waveGreen"></div>
      <div className="wave waveRed"></div>
      <div className="wave waveBlue"></div>
      <div className="waveYellow"></div>
      <div className="w-full relative z-50 max-w-md pd-6 glassEffect shadow-lg rounded-2xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-emerald-950">
          Create an account!
        </h1>
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;

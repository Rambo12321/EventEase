import SignupForm from "@/components/auth/SignupForm";
import { WavyBackground } from "@/components/magicUI/WavyBG";

const SignupPage = () => {
  return (
    <WavyBackground
      waveWidth={70}
      backgroundFill="black"
      speed="slow"
      colors={[
        "#00ffff",
        "#00ff9f",
        "#38bdf8",
        "#a855f7",
        "#ff00ff",
        "#facc15",
        "#ff3366",
      ]}
      className="signupContainer"
    >
      <div className="relative z-20 w-full max-w-md pt-2 glassEffect bg-black/30 shadow-lg rounded-2xl">
        <h1 className="text-2xl font-bold text-center mb-2 text-stone-300">
          Create an account!
        </h1>
        <SignupForm />
      </div>
    </WavyBackground>
  );
};

export default SignupPage;

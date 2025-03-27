import { Otp } from "@/components/auth/otp";
// import LoginForm from "@/components/forms/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <div className="w-full max-w-sm p-4 md:p-0">
      {/* TODO add logo for mobile */}
      {/* <Image src={"/images/logo.svg"} alt="logo" height={120} width={120} /> */}

      <h2 className="text-2xl md:text-3xl mb-7 md:mb-14 font-bold">
        Sign In to Compliance One
      </h2>

      {/* <LoginForm /> */}
      <Otp />
    </div>
  );
};

export default LoginPage;

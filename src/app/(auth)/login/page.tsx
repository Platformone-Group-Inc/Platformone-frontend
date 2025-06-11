import LoginForm from "@/components/forms/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <div className="w-full max-w-lg mx-auto p-4 md:p-0">
      {/* TODO add logo for mobile */}
      {/* <Image src={"/images/logo.svg"} alt="logo" height={120} width={120} /> */}

      <h2 className="text-2xl md:text-3xl my-7 md:my-14 font-bold">
        {/* Sign In to Compliance One */}
        Login
      </h2>

      <LoginForm />
    </div>
  );
};

export default LoginPage;

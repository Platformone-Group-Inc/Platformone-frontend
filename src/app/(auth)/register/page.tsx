import RegisterForm from "@/components/forms/auth/register-form";

const Register = () => {
  return (
    <div className="w-full p-4 md:p-0">
      {/* TODO add logo for mobile */}
      {/* <Image src={"/images/logo.svg"} alt="logo" height={120} width={120} /> */}

      <h2 className="text-2xl md:text-3xl my-7 md:my-14 font-bold">
        {/* Sign In to Compliance One */}
        Register
      </h2>

      <RegisterForm />
    </div>
  );
};

export default Register;

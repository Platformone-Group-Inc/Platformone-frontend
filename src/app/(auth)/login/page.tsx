import LoginForm from "@/components/forms/auth/login-form";
import Image from "next/image";

const LoginPage = () => {
    return (
        <div className="h-dvh w-full flex items-center">
            <div
                className="hidden relative h-full w-full lg:flex items-center justify-center rounded-br-[117px] text-white text-center overflow-hidden"
                style={{
                    // backgroundImage: "url(/images/water.jpeg)",
                }}
            >
                <div className="absolute inset-0 login-gradient z-[-1]" />
                <div className="w-full flex flex-col items-center gap-8 max-w-sm mx-auto">
                    <Image src={"/images/logo.svg"} alt="logo" height={120} width={120} />
                    <h1 className="text-5xl font-semibold">Compliance one</h1>
                    <p className="text-lg">
                        Your single source for streamlined FedRAMP and CMMC compliance. Gain
                        confidence in your security posture, ensure regulatory alignment,
                        and drive operational excellence—all in one integrated platform.
                        <br />
                        <br />
                        Login to simplify compliance and safeguard your organization today.
                    </p>
                </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center">
                <div className="w-full max-w-sm ">
                    <h2 className="text-3xl mb-14 font-bold">Sign In to Compliance One</h2>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

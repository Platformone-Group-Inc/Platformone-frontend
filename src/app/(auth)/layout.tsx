import Image from "next/image";
import Link from "next/link";

const AuthLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="h-dvh w-full flex items-center">
      <div
        className="hidden relative bg-primary h-full w-full lg:flex items-center justify-center rounded-br-[117px] text-white text-center overflow-hidden"
        style={{
          backgroundImage: "url(./images/login-bg.png)",
        }}
      >
        <Link href={"/"}>
          {/* TODO change this */}
          <img
            src={"/images/platform-one.png"}
            alt="asdfa"
            className="absolute top-0 left-6 z-10  w-[150px]  "
          />
        </Link>
        {/* <div className="absolute inset-0 bg-black/30 backdrop-blur " /> */}
        <div className="absolute inset-0 h-full justify-center w-full flex flex-col items-center gap-8 max-w-sm mx-auto">
          <Image src={"/images/logo.svg"} alt="logo" height={150} width={180} />
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
        {children}
        <p className="text-sm mt-7">A PlatformoneInc Product.</p>
      </div>
    </div>
  );
};

export default AuthLayout;

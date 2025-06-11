import { AnimatedContainer } from "@/components/animated/animated-container";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

const AuthLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="w-full h-dvh overflow-hidden grid grid-cols-1 lg:grid-cols-2">
      <div
        className="hidden relative bg-primary bg-no-repeat bg-cover h-full w-full lg:flex flex-col gap-6 items-center justify-center rounded-br-[117px] text-white text-center"
        style={{
          backgroundImage: "url(/images/login-bg.png)",
        }}
      >
        <AnimatedContainer animation="fade" isOpen>
          <Image src="/images/logo.svg" alt="logo" height={150} width={180} />
        </AnimatedContainer>
        <AnimatedContainer delay={0.2} isOpen className="text-lg max-w-xl">
          Your single source for streamlined FedRAMP and CMMC compliance. Gain
          confidence in your security posture, ensure regulatory alignment, and
          drive operational excellence—all in one integrated platform.
          <br />
        </AnimatedContainer>
        <AnimatedContainer delay={0.3} isOpen className="text-lg max-w-xl">
          Login to simplify compliance and safeguard your organization today.
        </AnimatedContainer>
      </div>

      <ScrollArea className="w-full h-full overflow-y-auto flex flex-col items-center justify-center">
        <div className="max-w-lg mx-auto space-y-8 p-4">
          {children}
          <p className="text-sm font-semibold w-full text-center">
            A product by Platform One Inc.
          </p>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AuthLayout;

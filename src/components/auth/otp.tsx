"use client";

import { cn } from "@/lib/utils";
import { OTPInput, SlotProps } from "input-otp";
import { useId } from "react";
import { MailIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
function Slot(props: SlotProps & { isError: boolean }) {
  return (
    <div
      className={cn(
        "flex size-16 items-center justify-center text-xl rounded-xl border-2 bg-background font-semibold text-foreground shadow-sm shadow-black/5 transition-shadow",
        {
          "z-10 border-ring ring-[3px] ring-primary/20": props.isActive,
          "border-error-400 text-error": props.isError,
        }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}

export function Otp() {
  const id = useId();
  const [isError, setIsError] = useState(false);

  const handleVerify = () => {
    // Simulate OTP verification logic
    const isOtpValid = false; // Replace with actual validation logic
    setIsError(!isOtpValid);
  };

  return (
    <div className="flex flex-col text-center items-center space-y-6">
      <span className="p-2 rounded-lg border border-secondary-200">
        <MailIcon className="size-7" />
      </span>
      <div>
        <h2 className="text-2xl mb-3 text-secondary font-semibold">
          Check your email
        </h2>
        <p className="w-full text-secondary-400 text-base">
          We sent a verification link to{" "}
          <b className="text-secondary font-medium">olivia@complianceone.com</b>
        </p>
      </div>
      <OTPInput
        id={id}
        containerClassName="flex items-center gap-3 has-[:disabled]:opacity-50"
        maxLength={4}
        render={({ slots }) => (
          <div className="flex gap-2">
            {slots.map((slot, idx) => (
              <Slot key={idx} {...slot} isError={isError} />
            ))}
          </div>
        )}
      />
      {isError && (
        <p className="text-xs text-error-500">
          The OTP you entered is incorrect. Please try again.
        </p>
      )}
      <button onClick={() => setIsError(!isError)}>Toggle Error</button>
      <Button
        type="button"
        onClick={handleVerify}
        className="w-full rounded-full h-auto py-2 md:py-3 md:text-lg font-semibold"
      >
        Verify Email
      </Button>
      <p className="text-base text-secondary-400">
        Didn&apos;t receive the email?{" "}
        <button className="font-semibold text-primary">Click to resend</button>
      </p>
    </div>
  );
}

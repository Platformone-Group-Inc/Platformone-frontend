"use client";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";

import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { FaMicrosoft as MicrosoftIcon } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";

const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div className={cn("flex flex-col gap-6 ", className)} {...props}>
      <form>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email" className="font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="olivia@complianceone.com"
              className="rounded-lg md:h-11 px-3.5 py-2.5 text-sm md:text-base"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password" className="font-medium">
                Password
              </Label>
            </div>
            <PasswordInput
              id="password"
              placeholder="min 12 character"
              required
              className="rounded-lg md:h-11 px-3.5 py-2.5 text-sm md:text-base"
            />
          </div>
          <div className="grid gap-2">
            <div className="flex gap-2 items-center">
              <Checkbox id="keep-logged-in" />
              <Label htmlFor="keep-logged-in" className="font-normal">
                Keep me logged in
              </Label>
              <a
                href="#"
                className="ml-auto font-medium inline-block text-primary text-sm underline-offset-4 hover:underline"
              >
                Forget password?
              </a>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full rounded-full h-auto py-2 md:py-3 md:text-lg font-semibold"
          >
            Log In
          </Button>
        </div>
        <div className="mt-4 text-sm">
          Not registered yet? {/* TODO change text color */}
          <Link href="/register" className="text-primary font-semibold">
            Create an Account
          </Link>
        </div>
        <div className="space-y-4 mt-8 w-full">
          <div className="flex items-center gap-4 w-full">
            <div className="border-[0.5px] w-full border-black/10" />
            <span className="text-[#90A3BF] font-medium">or</span>
            <div className="border-[0.5px] w-full border-black/10" />
          </div>
          <Button
            type="button"
            variant={"outline"}
            className="w-full h-11 rounded-lg px-3.5 py-2.5 mb-4"
          >
            <GoogleIcon className="!size-6" />
            <span className="text-sm font-medium">Sign in with Google</span>
          </Button>
          <Button
            type="button"
            variant={"outline"}
            className="w-full h-11 rounded-lg px-3.5 py-2.5"
          >
            <MicrosoftIcon className="!size-6" />
            <span className="text-sm font-medium">Sign in with Microsoft</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

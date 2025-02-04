"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";

const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
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
              className="h-11 px-3.5 py-2.5"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password" className="font-medium">
                Password
              </Label>
              <a
                href="#"
                className="ml-auto font-medium inline-block text-primary text-sm underline-offset-4 hover:underline"
              >
                Forget password?
              </a>
            </div>
            <PasswordInput
              id="password"
              placeholder="min 12 character"
              required
              className="h-11 px-3.5 py-2.5"
            />
          </div>
          <Button
            type="submit"
            className="w-full rounded-full h-auto py-3 text-lg font-semibold"
          >
            Log In
          </Button>
        </div>
        <div className="mt-4 text-sm">
          Not registered yet? {/* TODO change text color */}
          <a href="#" className="text-primary font-semibold">
            Create an Account
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

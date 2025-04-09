"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { FaMicrosoft as MicrosoftIcon } from "react-icons/fa";
// import { useToast } from "@/components/ui/use-toast";
import { loginMutationFn } from "@/services/operations/Auth";
import { useMutation } from "@tanstack/react-query";

const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: loginMutationFn,
  });
  // const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    keepLoggedIn: false,
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 12) {
      newErrors.password = "Password must be at least 12 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      keepLoggedIn: checked,
    });

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (!validateForm()) {
    //   return;
    // }
const data = {
  email: formData.email,
  password: formData.password
}
    setIsLoading(true);
    // const res = await signIn("credentials", {
    //   redirect: true,
    //   email: formData.email,
    //   password:formData.password,
    //   // callbackUrl: "/"a
    // });
    mutate(data, {
      onSuccess: (response) => {
        console.log(response)
        // if (response.data.mfaRequired) {
        //   router.replace(`/verify-mfa?email=${values.email}`);
        //   return;
        // }
        router.replace(`/`);
      },
      onError: (error) => {
        // toast({
        //   title: "Error",
        //   description: error.message,
        //   variant: "destructive",
        // });
      },
    });
    console.log(formData)

    setIsLoading(false);

  };

  const handleSocialLogin = async (provider: "google" | "microsoft") => {
    setIsLoading(true);
    try {
      // Replace with your social login endpoint
      window.location.href = `/api/auth/${provider}`;
    } catch (error) {
      console.error(`${provider} login error:`, error);
      // toast({
      //   variant: "destructive",
      //   title: "Login failed",
      //   description: `Could not sign in with ${provider}. Please try again.`,
      // });
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email" className="font-medium">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="olivia@complianceone.com"
              className="rounded-lg md:h-11 px-3.5 py-2.5 text-sm md:text-base"
              value={formData.email}
              onChange={handleInputChange}
              required
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password" className="font-medium">
                Password
              </Label>
            </div>
            <PasswordInput
              id="password"
              name="password"
              placeholder="min 12 characters"
              required
              className="rounded-lg md:h-11 px-3.5 py-2.5 text-sm md:text-base"
              value={formData.password}
              onChange={handleInputChange}
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex gap-2 items-center">
              <Checkbox
                id="keep-logged-in"
                checked={formData.keepLoggedIn}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="keep-logged-in" className="font-normal">
                Keep me logged in
              </Label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="ml-auto font-medium inline-block text-primary text-sm underline-offset-4 hover:underline"
              >
                Forget password?
              </button>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full rounded-full h-auto py-2 md:py-3 md:text-lg font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </Button>
        </div>
        <div className="mt-4 text-sm">
          Not registered yet?{" "}
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
            onClick={() => handleSocialLogin("google")}
            disabled={isLoading}
          >
            <GoogleIcon className="!size-6" />
            <span className="text-sm font-medium">Sign in with Google</span>
          </Button>
          <Button
            type="button"
            variant={"outline"}
            className="w-full h-11 rounded-lg px-3.5 py-2.5"
            onClick={() => handleSocialLogin("microsoft")}
            disabled={isLoading}
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
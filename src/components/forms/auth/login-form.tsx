"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import { FcGoogle as GoogleIcon } from "react-icons/fc";

// import { useToast } from "@/components/ui/use-toast";
import { loginMutationFn } from "@/services/operations/Auth";
import { useMutation } from "@tanstack/react-query";
import MicrosoftIcon from "@/components/icons/microsoft-icon";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2Icon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Otp } from "@/components/auth/otp";
import { useLogin } from "@/services/mutations/Auth";
import { useRouter } from "next/navigation";

const loginFormSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .nonempty("Password is required"),
  keepLoggedIn: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const LoginForm = ({
  className,
}: // ...props
React.ComponentPropsWithoutRef<"div">) => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      keepLoggedIn: false,
    },
  });
  const router = useRouter();
  const { mutate: login, isPending } = useLogin({
    redirectTo: '/',
    onSuccess: (data) => {
      router.push('/');
      // You can add additional logic here if needed
      // For example, if you need to store the keepLoggedIn preference
      const keepLoggedIn = form.getValues("keepLoggedIn");
      if (keepLoggedIn) {
        // Set cookie expiration longer or store in localStorage
        localStorage.setItem("preferredAuth", "login");
      }
      
      // Check if email verification is required
      if (data.data.user && !data.data.user.isEmailVerified) {
        // setEmailForOTP(form.getValues("email"));
        // setShowOTP(true);
      }
    }
  });

  const handleSubmit = (values: LoginFormValues) => {
    login({
      email: values.email,
      password: values.password
    });
  };

  const handleSocialLogin = async (provider: "google" | "microsoft") => {
    console.log(provider);
  };

  return (
    <AnimatePresence>
      <>
        {false ? (
          <Otp />
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={cn("flex flex-col gap-6", className)}
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-8"
              >
                <div className="flex flex-col gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-sm">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            type="email"
                            placeholder="olivia@complianceone.com"
                            className="rounded-lg md:h-11 px-3.5 py-2.5 text-sm md:text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-sm">
                          Password
                        </FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder="min 12 characters"
                            required
                            className="rounded-lg md:h-11 px-3.5 py-2.5 text-sm md:text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="keepLoggedIn"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FormControl>
                              <Checkbox
                                id="remember"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel htmlFor="remember" className="text-sm">
                              Keep me logged in
                            </FormLabel>
                          </div>
                          <Link
                            href={"/forget-password"}
                            className="ml-auto font-medium inline-block text-primary text-sm underline-offset-4 hover:underline"
                          >
                            Forget password?
                          </Link>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full rounded-full h-auto py-2 md:py-3 md:text-lg font-semibold"
                  >
                    {isPending && <Loader2Icon className="animate-spin" />}
                    {isPending ? "Logging in..." : "Log In"}
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
                    disabled={isPending}
                  >
                    <GoogleIcon className="!size-6" />
                    <span className="text-sm font-medium">
                      Sign in with Google
                    </span>
                  </Button>
                  <Button
                    type="button"
                    variant={"outline"}
                    className="w-full h-11 rounded-lg px-3.5 py-2.5"
                    onClick={() => handleSocialLogin("microsoft")}
                    disabled={isPending}
                  >
                    <MicrosoftIcon className="!size-6" />

                    <span className="text-sm font-medium">
                      Sign in with Microsoft
                    </span>
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
        )}

        <button
          className="w-full text-center text-error"
          onClick={() => {
            // setShowOTP((s) => !s);
          }}
        >
          {false ? "hide" : "show"} otp
        </button>
      </>
    </AnimatePresence>
  );
};

export default LoginForm;

"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import z from "zod";

import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ContactForm, LoginForm, SignupForm } from "./dummy-form";

const steps = [
  {
    step: 1,
    title: "General",
  },
  {
    step: 2,
    title: "Assets",
  },
  {
    step: 3,
    title: "Threats & Vulnerable",
  },
  {
    step: 4,
    title: "Score",
  },
];

const formSchema = z.object({
  name: z.string().min(1),
  owner: z.string().min(1),
  department: z.string().min(1),
  name_0564995201: z.string().min(1),
});

const NewRiskForm = () => {
  const [formStep, setFormStep] = useState(1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div className="mx-auto w-full space-y-8 text-center">
      {formStep}
      <Stepper value={formStep} onValueChange={setFormStep}>
        {steps.map(({ step, title }) => (
          <StepperItem
            key={step}
            step={step}
            className="relative flex-1 !flex-col"
          >
            <StepperTrigger className="flex-col gap-3">
              <StepperIndicator />
              <div className="space-y-0.5 px-2">
                <StepperTitle>{title}</StepperTitle>
              </div>
            </StepperTrigger>
            {step < steps.length && (
              <StepperSeparator className="absolute inset-x-0 left-[calc(50%+0.75rem+0.125rem)] top-3 -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
            )}
          </StepperItem>
        ))}
      </Stepper>
      {formStep === 1 && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      type="text"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="owner"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Owner" type="" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>

            <div className="text-left space-y-2">
              <Label>What is the Business impact of this Risk</Label>
              <Textarea cols={10} />

              <p className="text-xs">275 characters left</p>
            </div>
          </form>
        </Form>
      )}
      {formStep === 2 && <ContactForm />}
      {formStep === 3 && <LoginForm />}
      {formStep === 4 && <SignupForm />}
      <div className="flex gap-2 items-center justify-end w-full">
        {formStep > 1 && (
          <Button
            type="button"
            onClick={() => setFormStep((state) => state - 1)}
          >
            Previous
          </Button>
        )}
        <Button type="button" onClick={() => setFormStep((state) => state + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default NewRiskForm;

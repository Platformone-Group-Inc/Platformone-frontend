"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/dropzone";
import { Label } from "@/components/ui/label";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
} from "@/components/ui/stepper";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import MapFieldDataTable from "../tables/map-field-data-table";
import { ScrollArea } from "@/components/ui/scroll-area";

const steps = [
  {
    step: 1,
    title: "Step One",
    description: "Desc for step one",
  },
  {
    step: 2,
    title: "Step Two",
    description: "Desc for step two",
  },
  {
    step: 3,
    title: "Step Three",
    description: "Desc for step three",
  },
];

const errors = [5, 6, 7, 8, 9, 10, 11].map((n) => ({
  line: n,
  message: "Owner is not valid",
}));

const UploadFile = () => {
  return (
    <motion.div
      initial={{
        x: 10,
      }}
      animate={{
        x: 0,
      }}
      exit={{
        x: -10,
      }}
      className="w-full text-left border rounded-md p-4"
    >
      <Dropzone
        maxSize={1024 * 1024 * 10}
        minSize={1024}
        maxFiles={10}
        accept={{ "image/*": [] }}
        onError={console.error}
        className="w-full h-52"
      >
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>

      <div className="space-y-4">
        <Label htmlFor="delimeter" className="font-medium ">
          Select the delimeter of the file
        </Label>

        <Select>
          <SelectTrigger id="delimeter">
            <SelectValue placeholder="Comma(.)" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value=".">Comma(.)</SelectItem>

              <SelectItem value="|">Pipe(I)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );
};

const MapField = () => {
  return (
    <motion.div
      initial={{
        x: 10,
      }}
      animate={{
        x: 0,
      }}
      exit={{
        x: -10,
      }}
    >
      <MapFieldDataTable />
    </motion.div>
  );
};

const Import = () => {
  return (
    <motion.div
      initial={{
        x: 10,
      }}
      animate={{
        x: 0,
      }}
      exit={{
        x: -10,
      }}
    >
      <div className="w-full max-w-6xl rounded-lg border border-error-200 overflow-hidden">
        {/* banner */}
        <div className="flex flex-wrap items-center gap-3 bg-error-50 px-4 py-2 text-sm font-medium text-error-600">
          <span className="inline-flex rounded-full border border-error-300 bg-white px-3 py-1">
            Validation Failed
          </span>
          <span>Please correct the following errors before proceeding</span>
        </div>

        {/* list */}
        <ul className="divide-y divide-gray-100">
          {errors.map(({ line, message }) => (
            <li
              key={line}
              className="flex items-center gap-6 bg-white px-6 py-4 text-error-600"
            >
              <span className="font-semibold whitespace-nowrap">
                Line {line}:
              </span>
              <span>{message}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const UploadQuestionsForm = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="space-y-8 text-center p-4">
      <Stepper value={step} onValueChange={setStep} className="">
        {steps.map(({ step, title }) => (
          <StepperItem
            key={step}
            step={step}
            className="relative flex-1 !flex-col"
          >
            <div className="flex flex-col items-center justify-center gap-3">
              <StepperIndicator />
              <div className="space-y-0.5 px-2">
                <StepperTitle>{title}</StepperTitle>
              </div>
            </div>
            {step < steps.length && (
              <StepperSeparator className="absolute inset-x-0 left-[calc(50%+0.75rem+0.125rem)] top-3 -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
            )}
          </StepperItem>
        ))}
      </Stepper>
      {/* {step} */}

      <ScrollArea className="max-h-[600px] overflow-y-auto">
        <AnimatePresence>
          {step === 1 && <UploadFile />}
          {step === 2 && <MapField />}
          {step === 3 && <Import />}
        </AnimatePresence>
      </ScrollArea>

      <div className="flex items-center justify-between w-full">
        {
          <Button disabled={step <= 1} onClick={() => setStep((s) => s - 1)}>
            Previous
          </Button>
        }
        {
          <Button
            disabled={step >= steps.length}
            onClick={() => setStep((s) => s + 1)}
          >
            Next
          </Button>
        }
      </div>
    </div>
  );
};

export default UploadQuestionsForm;

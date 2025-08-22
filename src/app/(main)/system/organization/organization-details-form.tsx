"use client";

import BrandLogo from "@/components/icons/brand-logo";
import { Button } from "@/components/ui/button";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/dropzone";
import { Input } from "@/components/ui/input";
import { InfoIcon, TrashIcon } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { XIcon, SaveIcon } from "lucide-react";
type EditableInputProps = {
  name: string;
  placeholder: string;
  defaultValue?: string;
  onSave?: (value: string) => void;
};

const EditableInput = ({
  name,
  placeholder,
  defaultValue = "",
  onSave,
}: EditableInputProps) => {
  const { control, setValue, watch, getValues } = useForm({
    defaultValues: { [name]: defaultValue },
  });

  // TODO loading with mutations

  const [touched, setTouched] = useState(false);
  const value = watch(name);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex items-center gap-2 w-full">
          <Input
            {...field}
            placeholder={placeholder}
            onBlur={() => {
              setTouched(true);
              field.onBlur();
            }}
            onChange={(e) => {
              setTouched(true);
              field.onChange(e);
            }}
            value={field.value}
            className="flex-grow"
          />
          {touched && value && (
            <>
              <Button
                type="button"
                size="icon"
                variant="transparent"
                onClick={() => {
                  setValue(name, "");
                  setTouched(false);
                }}
              >
                <XIcon className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="secondary"
                onClick={() => {
                  onSave?.(getValues(name));
                  setTouched(false);
                }}
              >
                <SaveIcon className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      )}
    />
  );
};

const OrganizationDetailsForm = () => {
  return (
    <>
      <form className="space-y-4 max-w-[550px]">
        <EditableInput name="name" placeholder="Organization Name" />
        <EditableInput name="address" placeholder="Organization Address" />
        <EditableInput name="phone" placeholder="Organization Phone" />
      </form>
      <div className="space-y-2">
        {/* TODO change to smectic tag */}
        <p className="text-base font-semibold inline-flex items-center gap-2">
          Upload Image
          <InfoIcon className="" size={16} />
        </p>
        <p className="text-sm text-gray-600">
          Provide your organization&apos;s name and address that will appear on
          various reports requiring this information.
        </p>

        {true ? (
          <Dropzone
            maxSize={1024 * 1024 * 10}
            minSize={1024}
            maxFiles={10}
            accept={{ "image/*": [] }}
            onDrop={() => {
              //   setOpen(true);
            }}
            onError={console.error}
            className="w-full max-w-[550px] h-52"
          >
            <DropzoneEmptyState />
            <DropzoneContent />
          </Dropzone>
        ) : (
          <div className="border p-4 rounded-lg flex gap-3 max-w-[550px]">
            <BrandLogo fill="#7C5CFC" />
            <div className="flex-grow">
              <p className="font-medium text-sm">Logo.png</p>
              <p className="text-gray-400 text-sm">200 KB - 100% uploaded</p>
            </div>
            <Button
              variant={"transparent"}
              size={"icon"}
              onClick={() => {
                console.log("hello");
                // setOpen(false);
              }}
              className="text-error-500 hover:text-error-600"
            >
              <TrashIcon />
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default OrganizationDetailsForm;

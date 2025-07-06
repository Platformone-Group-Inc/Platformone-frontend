"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "./input";
import { Button } from "./button";
import { SaveIcon, XIcon } from "lucide-react";

export type EditableInputProps = {
  name: string;
  placeholder: string;
  defaultValue?: string;
  onSave?: (value: string) => void;
};

export const EditableInput = ({
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

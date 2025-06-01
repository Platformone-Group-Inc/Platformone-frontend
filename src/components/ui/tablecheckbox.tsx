import React, { useEffect, useRef, forwardRef } from "react";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  indeterminate?: boolean;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ indeterminate = false, ...props }, ref) => {
    const innerRef = useRef<HTMLInputElement>(null);
    const resolvedRef = (ref || innerRef) as React.RefObject<HTMLInputElement>;

    useEffect(() => {
      if (resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate;
      }
    }, [resolvedRef, indeterminate]);

    return (
      <input
        type="checkbox"
        ref={resolvedRef}
        className="h-4 w-4 rounded border border-gray-300 accent-primary"
        {...props}
      />
    );
  }
);

Checkbox.displayName = "Checkbox";

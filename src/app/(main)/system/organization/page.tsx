"use client";

import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/dropzone";
import { Input } from "@/components/ui/input";

const Organization = () => {
  return (
    <>
      <div className="space-y-2">
        <h2 className="text-base font-semibold">Organization Details</h2>
        <p className="text-sm text-gray-600">
          Provide your organization&apos;s name and address that will appear on
          various reports requiring this information.
        </p>
      </div>
      <form className="space-y-4 max-w-[550px]">
        <Input placeholder="Organization Name" />
        <Input placeholder="Organization Address" />
        <Input placeholder="Organization Phone" />
      </form>
      <div className="space-y-2">
        {/* TODO change to smectic tag */}
        <p className="text-base font-semibold">Upload Image</p>
        <p className="text-sm text-gray-600">
          Provide your organization&apos;s name and address that will appear on
          various reports requiring this information.
        </p>

        <Dropzone
          maxSize={1024 * 1024 * 10}
          minSize={1024}
          maxFiles={10}
          accept={{ "image/*": [] }}
          onError={console.error}
          className="w-full max-w-[500px] h-52"
        >
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
      </div>
    </>
  );
};

export default Organization;

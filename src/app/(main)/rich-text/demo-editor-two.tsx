"use client";
import { useState } from "react";
import { Content } from "@tiptap/react";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";

const DemoEditorTwo = () => {
  const [value, setValue] = useState<Content>("");

  return (
    <MinimalTiptapEditor
      value={value}
      onChange={setValue}
      className="w-full"
      editorContentClassName="p-5"
      output="html"
      placeholder="Enter your content..."
      autofocus={true}
      editable={true}
      editorClassName="focus:outline-none"
    />
  );
};

export default DemoEditorTwo;

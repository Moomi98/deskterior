"use client";

import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  onUpdateValue: Function;
}

export default function Editor(props: EditorProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    props.onUpdateValue(value);
  }, [value, props]);

  const toolbarOptions = [
    ["link", "image"],
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
  ];

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "background",
    "color",
    "link",
    "image",
    "width",
  ];

  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
  };
  return (
    <ReactQuill
      className="h-3/4"
      theme="snow"
      value={value}
      onChange={setValue}
      modules={modules}
      formats={formats}
    />
  );
}

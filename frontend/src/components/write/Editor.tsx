"use client";

import { useEffect, useMemo, useRef, useState, forwardRef } from "react";
import { RangeStatic } from "quill";
import ReactQuill, { ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRecoilValue } from "recoil";
import { UserState } from "@/src/stores/User";
import dynamic from "next/dynamic";

interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef: React.Ref<ReactQuill>;
}

interface EditorProps {
  onUpdateValue: Function;
}

const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: QuillComponent } = await import("react-quill");
    const Quill = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
      <QuillComponent ref={forwardedRef} {...props} />
    );
    return Quill;
  },
  { loading: () => <div>...loading</div>, ssr: false }
);

export default function Editor(props: EditorProps) {
  const [value, setValue] = useState("");
  const quillRef = useRef<ReactQuill>(null);
  const user = useRecoilValue(UserState);

  useEffect(() => {
    props.onUpdateValue(value);
  }, [value, props]);

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

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["link", "image"],
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          ["blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
        ],
        handlers: {
          image: () => {
            const editor = quillRef.current!.getEditor();
            const range = editor.getSelection(true);
            editor.setSelection((range.index + 1) as unknown as RangeStatic);
          },
        },
      },
    }),
    []
  );
  return (
    <QuillNoSSRWrapper
      className="flex flex-col h-3/4"
      theme="snow"
      forwardedRef={quillRef}
      value={value}
      onChange={setValue}
      modules={modules}
      formats={formats}
    />
  );
}

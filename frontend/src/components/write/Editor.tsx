"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { RangeStatic } from "quill";
import "react-quill/dist/quill.snow.css";
import { storage } from "@/src/firebase/firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { useRecoilValue } from "recoil";
import { UserState } from "@/src/stores/User";

interface EditorProps {
  onUpdateValue: Function;
}

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
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();
            input.addEventListener("change", async () => {
              if (!quillRef.current || !input.files) return;

              const editor = quillRef.current.getEditor();
              const file = input.files[0];
              const range = editor.getSelection(true);
              try {
                // 파일명을 "image/Date.now()"로 저장
                const storageRef = ref(
                  storage,
                  `image/${user.id}-${user.nickname}/${Date.now()}`
                );
                // Firebase Method : uploadBytes, getDownloadURL
                await uploadBytes(storageRef, file).then((snapshot) => {
                  getDownloadURL(snapshot.ref).then((url) => {
                    // 이미지 URL 에디터에 삽입
                    editor.insertEmbed(range.index, "image", url);
                    // URL 삽입 후 커서를 이미지 뒷 칸으로 이동
                    editor.setSelection(
                      (range.index + 1) as unknown as RangeStatic
                    );
                  });
                });
              } catch (error) {
                console.log(error);
              }
            });
          },
        },
      },
    }),
    [user]
  );
  return (
    <ReactQuill
      className="flex flex-col h-3/4"
      theme="snow"
      ref={quillRef}
      value={value}
      onChange={setValue}
      modules={modules}
      formats={formats}
    />
  );
}

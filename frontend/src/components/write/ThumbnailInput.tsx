import { MdAddCircle } from "react-icons/md";
import { ChangeEvent, useState } from "react";
import getWord from "@/src/constants/words";
import Image from "next/image";

interface ThumbnailInputProps {
  onChange: Function;
  showPreview?: Boolean;
}
export default function ThumbnailInput(props: ThumbnailInputProps) {
  const [thumbnail, setThumbnail] = useState<string | ArrayBuffer | null>();
  const { onChange, showPreview = true } = props;

  const onThumbnailChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => {
      reader.onload = () => {
        setThumbnail(reader.result);
        onChange(file);
        resolve(file);
      };
    });
  };

  return (
    <>
      <input
        type="file"
        id="thumbnail"
        className="hidden w-full h-full"
        accept="image/*"
        onChange={onThumbnailChanged}
      />
      {thumbnail && showPreview ? (
        <div className="w-full h-80 relative border border-slate-400">
          <Image src={thumbnail as string} alt="thumbnail" priority fill />
        </div>
      ) : (
        <label
          htmlFor="thumbnail"
          className="relative flex flex-col items-center justify-center w-full h-80 border rounded-sm cursor-pointer gap-3 border-dashed border-slate-400"
        >
          <MdAddCircle size={30} />
          <p className="text-slate-500">{getWord("Write", "thumbnail")}</p>
          <p className="text-slate-400">{getWord("Write", "warning")}</p>
        </label>
      )}
    </>
  );
}

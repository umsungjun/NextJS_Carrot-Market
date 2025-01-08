"use client";

import { ChangeEvent, useState } from "react";

import Input from "@/components/Input";
import Button from "@/components/Button";

import { PhotoIcon } from "@heroicons/react/24/solid";

export default function AddProduct() {
  const [preview, setPreview] = useState<string>("");
  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files) return;
    const file = files[0];

    /* 브라우저 메모리에 저장되는 이미지 주소 */
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <div>
      <form className="flex flex-col gap-5 p-5">
        <label
          htmlFor="photo"
          className="border-2 border-neutral-300 rounded-md border-dashed aspect-square flex items-center justify-center flex-col text-neutral-300 cursor-pointer bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${preview})`,
          }}
        >
          {preview === "" ? (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neural-400 text-sm">
                사진을 추가해주세요.
              </div>
            </>
          ) : (
            /* 이미지가 업로드 된 경우 */
            <></>
          )}
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="photo"
          name="photo"
          className="hidden"
        />
        <Input name="title" required placeholder="제목" type="text" />
        <Input name="price" required placeholder="가격" type="number" />
        <Input
          name="description"
          required
          placeholder="자세한 설명"
          type="text"
        />
        <Button text="작성완료" />
      </form>
    </div>
  );
}

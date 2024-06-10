"use client";
import React from "react";
import { createPost } from "@/app/service/post.service";
import { useRef } from "react";

export default function Create() {
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    if (!title || !content) {
      return null;
    }
    const result = await createPost(formData);
    if (!result) {
      alert("error");
      return false;
    }
    formRef?.current?.reset();
    window.location.href = "/post";
    return true;
  };

  return (
    <>
      <h1 className="text-3xl text-center">게시글 작성</h1>
      <hr className="my-8" />
      <form ref={formRef} action={handleSubmit}>
        <div className="flex flex-col">
          <textarea
            name="title"
            placeholder="제목을 입력하시오."
            className="p-4 my-4"
          />
          <textarea
            name="content"
            placeholder="내용을 입력하시오."
            className="p-4 h-[200px]"
          />
        </div>
        <div className="flex justify-end my-4">
          <div className="border bg-gray-400 p-2 text-white font-bold">
            <input type="submit" value="글작성" />
          </div>
        </div>
      </form>
    </>
  );
}

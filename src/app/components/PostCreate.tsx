"use client"

import { createPost } from "@/app/service/post.service";
import { useRef } from "react";

export default function PostCreate() {
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    if (!content) {
      return null;
    }

    formData.append("title", title);
    formData.append("content", content);

    const result = await createPost(formData);
    if (!result) {
      alert("추가에 실패했습니다.");
      return false;
    }

      formRef?.current?.reset();
      return true;
      
    };
    
      return (
        <form
          ref={formRef}
          className="flex justify-center mt-4 gap-2 px-8"
          action={handleSubmit}
        >
          <input
            type="text"
            name="title"
            className="flex-1 border border-gray-300 rounded-lg p-2"
            placeholder="제목을 입력하세요."
          />
          <input
            type="text"
            name="content"
            className="flex-1 border border-gray-300 rounded-lg p-2"
            placeholder="내용을 입력하세요."
          />
          <button className="border bg-black text-white p-2 rounded-md">
            추가
          </button>
        </form>
      );
}

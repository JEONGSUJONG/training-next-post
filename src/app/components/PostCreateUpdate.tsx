"use client";

import React from "react";
import { createPost, updatePost } from "@/app/service/post.service";

type PostCreateUpdateProps = {
  params?: { postId: string };
};

export default function PostCreateUpdate({ params }: PostCreateUpdateProps) {
  const isPostId = params ? parseInt(params.postId) : false;
  const formRef = React.useRef<HTMLFormElement>(null);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(formRef.current!);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    const postData = {
      title,
      content,
    };

    if (!title || !content) {
      alert("제목와 내용을 입력하세요.");
      return;
    }

    if (!isPostId) {
      // createPost
      const result = await createPost(postData);

      if (!result) {
        alert("게시판 작성에 실패했습니다.");
        return;
      } else {
        formRef.current?.reset();
        window.location.href = "/post";
      }
    } else {
      // updatePost
      const result = await updatePost(isPostId, postData);
      if (!result) {
        alert("게시판 작성에 실패했습니다.");
        return;
      } else {
        formRef.current?.reset();
        window.location.href = "/post/" + isPostId;
      }
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold">게시판 작성</h1>
      <hr className="my-8 border-black" />
      <form ref={formRef} onSubmit={handleSubmit}>
        <label className="block text-xl font-bold mb-2">제목</label>
        <input
          type="text"
          name="title"
          className="block text-sm mb-2 w-full p-4 rounded-md border border-gray-300"
          placeholder="제목을 입력하세요."
        />
        <label className="block text-xl font-bold mb-2">내용</label>
        <input
          type="text"
          name="content"
          className="block text-sm mb-2 w-full p-4 rounded-md border border-gray-300"
          placeholder="내용을 입력하세요."
        />
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="border bg-black text-white p-2 rounded-md"
          >
            작성
          </button>
        </div>
      </form>
    </>
  );
}

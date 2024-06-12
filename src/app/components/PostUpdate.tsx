"use client";

import { useState, useRef } from "react";
import { updatePost } from "@/app/service/post.service";

type Post = {
  id: number;
  title: string;
  content: string;
};

type PostUpdateProps = {
  post: Post;
};

export default function PostUpdate({ post }: PostUpdateProps) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    const updatedPost = await updatePost(post.id, { title, content });
    if (updatedPost) {
      alert("수정완료");
      window.location.href = "/post";
    } else {
      alert("수정에 실패했습니다.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">포스트 수정</h1>
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(formRef.current as HTMLFormElement);
          handleSubmit(formData);
        }}
      >
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="title">
            제목
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="content">
            내용
          </label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
        <button
          type="submit"
          className="border bg-black text-white p-2 rounded-md"
        >
          수정
        </button>
      </form>
    </div>
  );
}

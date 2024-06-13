"use client";

import React, { useEffect, useState } from "react";
import {
  createPost,
  updatePost,
  getPostById,
} from "@/app/service/post.service";

type PostCreateUpdateProps = {
  params?: { postId: string };
};

export default function PostCreateUpdate({ params }: PostCreateUpdateProps) {
  const isPostId = params ? parseInt(params.postId) : false;
  const [postData, setPostData] = useState({ title: "", content: "" });
  const formRef = React.useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (isPostId) {
      const fetchPostData = async () => {
        const post = await getPostById(isPostId);
        if (post) {
          setPostData(post);
        } else {
          alert("게시글 정보를 불러오는데 실패했습니다.");
        }
      };
      fetchPostData();
    }
  }, [isPostId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(formRef.current!);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if (!title || !content) {
      alert("제목과 내용을 입력하세요.");
      return;
    }

    const newPostData = { title, content };

    if (!isPostId) {
      // createPost
      const result = await createPost(newPostData);

      if (!result) {
        alert("게시글 작성에 실패했습니다.");
        return;
      } else {
        formRef.current?.reset();
        window.location.href = "/post";
      }
    } else {
      // updatePost
      const result = await updatePost(isPostId, newPostData);
      if (!result) {
        alert("게시글 수정에 실패했습니다.");
        return;
      } else {
        formRef.current?.reset();
        window.location.href = "/post/" + isPostId;
      }
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold">
        게시글 {isPostId ? "수정" : "작성"}
      </h1>
      <hr className="my-8 border-black" />
      <form ref={formRef} onSubmit={handleSubmit}>
        <label className="block text-xl font-bold mb-2">제목</label>
        <input
          type="text"
          name="title"
          className="block text-sm mb-2 w-full p-4 rounded-md border border-gray-300"
          placeholder="제목을 입력하세요."
          defaultValue={postData.title}
        />
        <label className="block text-xl font-bold mb-2">내용</label>
        <textarea
          name="content"
          className="block text-sm mb-2 w-full p-4 rounded-md border border-gray-300 h-[200px] resize-none"
          placeholder="내용을 입력하세요."
          defaultValue={postData.content}
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

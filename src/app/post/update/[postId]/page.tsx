"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { updatePost, getPostById } from "@/app/service/post.service";

type Params = {
  postId: string;
};

export default function UpdatePost({ params }: { params: Params }) {
  const router = useRouter();
  const postId = parseInt(params.postId);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPostById(postId);
      if (post) {
        setTitle(post.title);
        setContent(post.content);
      }
    };
    fetchPost();
  }, [postId]);

  const handleUpdate = async () => {
    const success = await updatePost(postId, { title, content });
    if (success) {
      router.push("/post");
    } else {
      console.error("게시물 업데이트에 실패했습니다.");
    }
  };

  return (
    <div>
      <h1 className="flex justify-center items-center text-2xl">게시글 수정</h1>
      <hr className="my-8" />
      <div className="mb-4">
        <label className="font-bold">제목</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2"
        />
      </div>
      <div className="mb-4">
        <label className="font-bold">내용</label>
        <textarea
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2"
        />
      </div>
      <button
        onClick={handleUpdate}
        className="bg-gray-400 text-white font-bold p-2"
      >
        게시판 수정
      </button>
    </div>
  );
}

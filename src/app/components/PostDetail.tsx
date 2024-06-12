"use client";

import { deletePost } from "../service/post.service";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: Date | string | number;
};

type PostDetailProps = {
  detailPost: Post | null;
};

export default function PostDetail({ detailPost }: PostDetailProps) {
  if (!detailPost) {
    return <div>포스트를 찾을 수 없습니다.</div>;
  }
  const deleteBtn = async (id: number) => {
    const result = await deletePost(id);

    if (!result) {
      alert("삭제에 실패했습니다.");
      return false;
    }
    window.location.href = "/post";
    return true;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{detailPost.title}</h1>
      <p className="text-lg text-gray-700 mb-2">{detailPost.content}</p>
      <p className="text-sm text-gray-500">
        작성일: {new Date(detailPost.createdAt).toLocaleDateString()}
      </p>
      <button
        onClick={() => {
          deleteBtn(detailPost.id);
        }}
        className="border bg-black text-white p-2 rounded-md"
      >
        삭제
      </button>
    </div>
  );
}

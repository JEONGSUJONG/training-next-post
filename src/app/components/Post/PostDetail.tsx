"use client";

import { deletePost } from "@/app/service/post.service";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  if (!detailPost) {
    return <div>포스트를 찾을 수 없습니다.</div>;
  }

  const deleteBtn = async (id: number) => {
    const result = await deletePost(id);

    if (!result) {
      alert("삭제에 실패했습니다.");
      return false;
    }
    alert("삭제 완료");
    window.location.href = "/post";
    return true;
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">{detailPost.title}</h1>
      <p className="text-sm text-gray-500">
        작성일: {new Date(detailPost.createdAt).toLocaleDateString()}
      </p>
      <div className="border-t border-b h-[200px] border-black my-2 py-2 text-md text-gray-700">
        {detailPost.content}
      </div>
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={() => router.push(`/post/${detailPost.id}/update`)}
          className="border bg-black text-white p-2 rounded-md"
        >
          수정
        </button>
        <button
          onClick={() => deleteBtn(detailPost.id)}
          className="border bg-black text-white p-2 rounded-md"
        >
          삭제
        </button>
      </div>
    </div>
  );
}

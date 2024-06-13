"use client";

import { createReply } from "@/app/service/reply.service";
import { useRef } from "react";

export default function ReplyInput({ postId }: { postId: string }) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const replyContent = formData.get("replyContent") as string;
    if (!replyContent) {
      return null;
    }
    const result = await createReply(postId, replyContent);
    if (!result) {
      alert("댓글 작성에 실패했습니다.");
      return false;
    }

    formRef.current?.reset();
    return true;
  };

  return (
    <div>
      <form ref={formRef} action={handleSubmit}>
        <input
          type="text"
          name="replyContent"
          className="w-full border p-2 rounded-md"
          placeholder="댓글을 입력하세요."
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="my-2 border bg-black text-white p-2 rounded-md"
          >
            작성
          </button>
        </div>
      </form>
    </div>
  );
}

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
      alert("댓글을 작성 FAILED");
      return false;
    }
    formRef?.current?.reset();
    return true;
  };

  return (
    <form ref={formRef} className="" action={handleSubmit}>
      <input
        type="text"
        name="replyContent"
        className=""
        placeholder="댓글을 입력하세요."
      />
      <button className="">생성</button>
    </form>
  );
}

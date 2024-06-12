"use client";

import { createReply } from "@/app/service/reply.service";

// params: postId , response: replyContent

export default function ReplyInput({ postId }: { postId: string }) {
  const handleSubmit = async () => {
    const result = await createReply(postId, replyContent);
    if (!result) {
      alert("Failed to create reply");
      return false;
    }
    return true;
  };

  return (
    <div>
      <textarea value={replyContent} placeholder="댓글을 입력하시오" />
      <button onClick={handleSubmit}>생성</button>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { getReplysByPostId } from "@/app/service/reply.service";

type Reply = {
  id: number;
  replycontent: string;
  createdAt: Date;
};

type ReplyListProps = {
  postId: number;
};

export default function ReplyList({ postId }: ReplyListProps) {
  const [replies, setReplies] = useState<Reply[]>([]);

  useEffect(() => {
    const fetchReplies = async () => {
      const data = await getReplysByPostId(postId.toString());
      setReplies(data);
    };
    fetchReplies();
  }, [postId]);

  return (
    <div>
      {replies.map((reply) => (
        <div
          key={reply.id}
          className="my-2 flex justify-between items-center border p-2 rounded-md"
        >
          <div className="flex">
            <p className="pl-2 font-bold">{reply.id}</p>
            <p className="pl-6">{reply.replycontent}</p>
          </div>
          <p className="text-sm text-gray-500">
            작성일 : {new Date(reply.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}

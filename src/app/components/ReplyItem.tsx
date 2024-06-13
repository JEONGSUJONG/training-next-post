// components/ReplyList.tsx

"use client";

import { useState, MouseEvent } from "react";
import { deleteReply } from "@/app/service/reply.service";
import { MdDeleteOutline } from "react-icons/md";

type Reply = {
  id: number;
  replycontent: string;
  createdAt: Date;
};

type ReplyListProps = {
  postId: number;
  replies?: Reply[];
};

const ReplyList = ({ postId, replies }: ReplyListProps) => {
  const [replyList, setReplyList] = useState(replies || []);

  const handleDelete = async (id: number) => {
    const result = await deleteReply(id);
    if (!result) {
      alert("삭제에 실패했습니다.");
      return false;
    }
    setReplyList(replyList.filter((reply) => reply.id !== id));
    return true;
  };

  return (
    <div>
      {replyList.map((reply) => (
        <div key={reply.id} className="border p-2 my-2">
          <div>{reply.replycontent}</div>
          <div className="text-xs text-gray-500">
            {new Date(reply.createdAt).toLocaleString()}
          </div>
          <button
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
              event.preventDefault();
              handleDelete(reply.id);
            }}
            className="text-red-500 hover:text-red-700"
          >
            <MdDeleteOutline />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReplyList;

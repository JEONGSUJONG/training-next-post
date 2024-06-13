"use client";

import { useState, MouseEvent } from "react";
import { deleteReply } from "@/app/service/reply.service";
import { MdDeleteOutline } from "react-icons/md";

type Reply = {
  id: number;
  replycontent: string;
  createdAt: Date;
};

export default function ReplyItem({ reply }: { reply: Reply }) {
  const handleDelete = async (id: number) => {
    const result = await deleteReply(id);
    if (!result) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <div className="flex justify-between items-center border p-2 my-2 rounded border-black">
        <div className="flex">
          <p className="font-bold pr-2">{reply.id}</p>
          <p className="pl-2">{reply.replycontent}</p>
        </div>
        <div className="flex">
          <div className="text-sm text-gray-500">
            {new Date(reply.createdAt).toLocaleString()}
          </div>
          <button
            onClick={(event: MouseEvent<HTMLButtonElement>) => {
              event.preventDefault();
              handleDelete(reply.id);
            }}
            className="text-2xl text-red-500 hover:text-red-700 pl-2"
          >
            <MdDeleteOutline />
          </button>
        </div>
      </div>
    </div>
  );
}

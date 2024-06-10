import React from "react";
import Link from "next/link";
import prisma from "@/prisma/prisma";
import { dateToLocalDateString } from "@/lib/utils";

export default async function PageList() {
  const postList = await prisma.post.findMany({
    orderBy: { id: "desc" },
    include: {
      // 댓글 수를 가져오도록 include 설정
      reply: true,
    },
  });
  return (
    <div>
      <h1 className="text-3xl text-center">게시판</h1>
      <hr className="my-8" />
      <div className="flex p-6 text-white bg-gray-400 font-bold">
        <p className="w-[20%]">제목</p>
        <p className="w-[40%]">내용</p>
        <p className="w-[30%]">작성일</p>
        <p className="w-[5%]">댓글</p>
      </div>
      <ul>
        {postList &&
          postList.map((post) => (
            <li
              className="border border-white hover:border-gray-400"
              key={post.id}
            >
              <Link href={`/post/${post.id}`}>
                <div className="flex p-6 cursor-pointer">
                  <p className="w-[20%]">
                    {post.title.length > 6
                      ? post.title.substring(0, 6) + "..."
                      : post.title}
                  </p>
                  <p className="w-[40%]">
                    {post.content.length > 20
                      ? post.content.substring(0, 20) + "..."
                      : post.content}
                  </p>
                  <p className="w-[30%] text-sm">
                    {dateToLocalDateString(post.createdAt)}
                  </p>
                  <p className="w-[5%] text-sm pl-2">{post.reply.length}</p>
                </div>
                <hr />
              </Link>
            </li>
          ))}
      </ul>
      <div className="flex justify-end p-2 mb-10">
        <Link
          href="/post/create"
          className="border bg-gray-400 text-white font-bold p-2"
        >
          글쓰기
        </Link>
      </div>
    </div>
  );
}

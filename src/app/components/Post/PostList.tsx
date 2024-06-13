"use client";
import Link from "next/link";
import { MdOutlineDateRange, MdOutlineComment } from "react-icons/md";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: Date | string | number;
  _count: {
    reply: number;
  };
};

type PostProps = {
  posts: Post[] | undefined;
};

function stringlength(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

export default function PostList({ posts }: PostProps) {
  return (
    <>
      <h1 className="text-center text-4xl font-bold">게시글</h1>
      <hr className="my-8 border-black" />
      {posts &&
        posts.map((post) => (
          <Link key={post.id} href={`/post/${post.id}`}>
            <div className="my-4 p-4 border border-black rounded cursor-pointer">
              <h2 className="text-2xl font-semibold">
                {stringlength(post.title, 30)}
              </h2>
              <p className="mt-2 text-gray-700 py-2">
                {stringlength(post.content, 60)}
              </p>
              <p className="flex justify-end items-center text-sm text-gray-400 gap-1">
                <MdOutlineComment />
                {post._count.reply}
                <MdOutlineDateRange />{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      <div className="flex justify-end mb-10">
        <Link
          href="/post/create"
          className="border bg-black text-white p-2 rounded-md"
        >
          글쓰기
        </Link>
      </div>
    </>
  );
}

"use client";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: Date | string | number;
};

type PostProps = {
  posts: Post[] | undefined;
};

export default function PostList({ posts }: PostProps) {
  return (
    <>
      <h1 className="text-center text-4xl font-bold">POST</h1>
      <hr className="my-8 border-black" />
      {posts &&
        posts.map((post) => (
          <Link key={post.id} href={`/post/${post.id}`}>
            <div className="my-4 p-4 border border-gray-200 rounded cursor-pointer">
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="mt-2 text-gray-700">{post.content}</p>
            </div>
          </Link>
        ))}
      <div className="flex justify-end p-2 mb-10">
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

"use client";
import { getPostById, deletePost } from "@/app/service/post.service";
import {
  getReplysByPostId,
  createReply,
  deleteReply,
} from "@/app/service/reply.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { dateToLocalDateString } from "@/lib/utils";

type Params = {
  postId: string;
};

type Post = {
  id: number;
  title: string;
  content: string;
};

type Reply = {
  id: number;
  replycontent: string;
  createdAt: string;
};

export default function PostDetail({ params }: { params: Params }) {
  const router = useRouter();
  const postId = parseInt(params.postId);
  const [detailPost, setDetailPost] = useState<Post | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [newReplyContent, setNewReplyContent] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await getPostById(postId);
        setDetailPost(postData);

        const replyData = await getReplysByPostId(postId.toString());
        setReplies(replyData);
      } catch (error) {
        console.error("데이터를 가져오는 중 에러가 발생했습니다:", error);
      }
    };

    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    if (!window.confirm("정말로 이 게시물을 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deletePost(postId);
      router.push("/post");
    } catch (error) {
      console.error("게시물 삭제 중 에러가 발생했습니다:", error);
    }
  };

  const handleEdit = () => {
    router.push(`/post/update/${postId}`);
  };

  const handleReplySubmit = async () => {
    try {
      await createReply(postId.toString(), newReplyContent);
      const updatedReplies = await getReplysByPostId(postId.toString());
      setReplies(updatedReplies);
      setNewReplyContent("");
    } catch (error) {
      console.error("댓글 작성 중 에러가 발생했습니다:", error);
    }
  };

  const handleReplyDelete = async (replyId: number) => {
    try {
      await deleteReply(replyId);
      const updatedReplies = replies.filter((reply) => reply.id !== replyId);
      setReplies(updatedReplies);
    } catch (error) {
      console.error("댓글 삭제 중 에러가 발생했습니다:", error);
    }
  };

  return (
    <>
      {detailPost && (
        <>
          <h1 className="flex justify-center items-center text-2xl">
            게시판 상세
          </h1>
          <hr className="my-6" />
          <div className="border p-4">
            <h1 className="font-bold">{detailPost.title}</h1>
            <hr className="my-4" />
            <p>{detailPost.content}</p>
          </div>
          <div className="flex justify-end my-10">
            <button
              className="border bg-gray-400 text-white font-bold p-2"
              onClick={handleEdit}
            >
              수정
            </button>
            <button
              className="border bg-gray-400 text-white font-bold p-2 ml-2"
              onClick={handleDelete}
            >
              삭제
            </button>
          </div>

          <input
            className="border w-full p-4"
            value={newReplyContent}
            onChange={(e) => setNewReplyContent(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              className="border bg-gray-400 text-white font-bold p-2 my-4"
              onClick={handleReplySubmit}
            >
              댓글 작성
            </button>
          </div>
          <div className="mb-10">
            {replies.map((reply: Reply) => (
              <div key={reply.id} className="flex w-full p-4 items-center">
                <p className="w-[5%] font-bold">{reply.id}</p>
                <p className="w-[60%] px-6">{reply.replycontent}</p>
                <p className="w-[25%] text-gray-400 text-sm">
                  {dateToLocalDateString(new Date(reply.createdAt))}
                </p>
                <button
                  className="w-[6%] ml-6 text-white font-bold border p-1 bg-gray-400"
                  onClick={() => handleReplyDelete(reply.id)}
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

"use server";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

export async function getReplysByPostId(postId: string) {
  try {
    const replies = await prisma.reply.findMany({
      where: {
        postId: parseInt(postId),
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return replies;
  } catch (error) {
    console.error("댓글을 가져오는 중 에러가 발생했습니다:", error);
    throw new Error("댓글을 가져오는 데 실패했습니다.");
  }
}

export async function createReply(postId: string, replyContent: string) {
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(postId),
    },
  });

  if (!post) {
    throw new Error("해당하는 게시물을 찾을 수 없습니다.");
  }

  const result = await prisma.reply.create({
    data: {
      replycontent: replyContent,
      postId: parseInt(postId),
      createdAt: new Date(),
    },
  });
  if (!result) {
    return null;
  }
  revalidatePath("/post");
  return result;
}

export async function deleteReply(replyId: number) {
  const result = await prisma.reply.delete({
    where: {
      id: replyId,
    },
  });

  if (!result) {
    return null;
  }
  revalidatePath("/post");
  return true;
}

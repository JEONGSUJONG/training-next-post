"use server";
import prisma from "@/prisma/prisma";

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
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(postId),
      },
    });

    if (!post) {
      throw new Error("해당하는 게시물을 찾을 수 없습니다.");
    }

    // 댓글 생성
    const newReply = await prisma.reply.create({
      data: {
        replycontent: replyContent,
        postId: parseInt(postId),
        createdAt: new Date(),
      },
    });
    return newReply;
  } catch (error) {
    console.error("댓글을 생성하는 중 에러가 발생했습니다:", error);
    throw new Error("댓글을 생성하는 데 실패했습니다.");
  }
}

export async function deleteReply(replyId: number): Promise<void> {
  try {
    await prisma.reply.delete({
      where: {
        id: replyId,
      },
    });
  } catch (error) {
    console.error("댓글 삭제 중 에러가 발생했습니다:", error);
    throw new Error("댓글 삭제에 실패했습니다.");
  }
}

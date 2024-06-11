"use server";
import prisma from "@/prisma/prisma";

// 모든 게시판 읽기
export async function getAllPosts() {
  const postList = prisma.post.findMany({
    orderBy: { id: "desc" },
  });
  return postList;
}

// 특정 게시물 가져오기
export async function getPostById(postId: number) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
      },
    });
    return post;
  } catch (error) {
    console.error("게시물을 가져오는 데 실패했습니다:", error);
    return null;
  }
}

// 게시판 생성
export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  const newPost = await prisma.post.create({
    data: {
      title: title,
      content: content,
    },
  });
  if (!newPost) {
    return null;
  }
  return newPost;
}

// 게시판 삭제
export async function deletePost(postId: number) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        reply: true,
      },
    });
    if (!post) {
      return null;
    }
    await prisma.reply.deleteMany({
      where: {
        postId,
      },
    });
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return true;
  } catch (error) {
    console.error("Error deleting post:", error);
    return false;
  }
}



// 게시판 수정
export async function updatePost(
  postId: number,
  newData: { title: string; content: string }
) {
  try {
    const result = await prisma.post.update({
      where: {
        id: postId,
      },
      data: newData,
    });

    if (!result) {
      return null;
    }
    return true;
  } catch (error) {
    return false;
  }
}

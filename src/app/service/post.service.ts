"use server";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

// 모든 게시판 읽기
export async function getAllPosts() {
  const postList = prisma.post.findMany({
    orderBy: { id: "desc" },
  });
  return postList;
}

type Post = {
  id: number | null; // Make id nullable
  title: string;
  content: string;
};

// 특정 게시판 읽기
export async function getPostById(postId: number): Promise<Post | null> {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        id: true, // Include id in the response
        title: true,
        content: true,
      },
    });
    return post;
  } catch (error) {
    console.error("Failed to fetch post:", error);
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
  revalidatePath("/post");
  return newPost;
}

// 게시판 삭제
export async function deletePost(postId: number) {
  try {
    const post = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return null;
    }

    revalidatePath("/");
    return true;
  } catch (error) {
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

    revalidatePath("/");
    return true;
  } catch (error) {
    return false;
  }
}

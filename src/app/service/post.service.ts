"use server";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

// 모든 게시판 읽기
export async function getAllPosts() {
  const postList = await prisma.post.findMany({
    orderBy: { id: "desc" },
    include: {
      _count: {
        select: { reply: true },
      },
    },
  });
  return postList;
}

// 특정 게시물 가져오기
export async function getPostById(postId: number) {
  const result = await prisma.post.findUnique({
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
  if (!result) {
    return null;
  }
  revalidatePath("/");
  return result;
}

// 게시판 생성
export async function createPost({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const newPost = await prisma.post.create({
    data: {
      title,
      content,
    },
  });
  if (!newPost) {
    return null;
  }
  revalidatePath("/");
  return newPost;
}

// 게시판 삭제
export async function deletePost(postId: number) {
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
}

// 게시판 수정
export async function updatePost(
  postId: number,
  formData: { title: string; content: string }
) {
  const result = await prisma.post.update({
    where: {
      id: postId,
    },
    data: formData,
  });

  if (!result) {
    return null;
  }
  return true;
}

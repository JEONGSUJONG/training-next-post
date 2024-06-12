import { getPostById, updatePost } from "@/app/service/post.service";
import PostUpdate from "@/app/components/PostUpdate";

type UpdatePostPageProps = {
  params: {
    postId: string;
  };
};

export default async function UpdatePost({ params }: UpdatePostPageProps) {
  const postId = parseInt(params.postId);
  const post = await getPostById(postId);

  if (!post) {
    return <div>포스트가 존재하지 않네요 ㅠ</div>;
  }

  return <PostUpdate post={post} />;
}

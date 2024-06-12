import PostDetail from "@/app/components/PostDetail";
import ReplyList from "@/app/components/ReplyList";
import { getPostById } from "@/app/service/post.service";

export default async function DetailPosts({
  params,
}: {
  params: { postId: string };
}) {
  const postId = parseInt(params.postId);
  const detailPost = await getPostById(postId);
  return (
    <>
      <PostDetail detailPost={detailPost} />
      <ReplyList postId={postId} />
    </>
  );
}

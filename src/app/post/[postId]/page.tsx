import PostDetail from "@/app/components/Post/PostDetail";
import ReplyInput from "@/app/components/Reply/ReplyInput";
import ReplyItem from "@/app/components/Reply/ReplyItem";
import { getPostById } from "@/app/service/post.service";
import { getReplysByPostId } from "@/app/service/reply.service";

type DetailPostProps = {
  params: {
    postId: string;
  };
};

export default async function DetailPosts({ params }: DetailPostProps) {
  const postId = parseInt(params.postId);
  // Post 불러오기
  const detailPost = await getPostById(postId);
  const replyList = await getReplysByPostId(postId.toString());

  return (
    <div className="my-8">
      <PostDetail detailPost={detailPost} />
      <ReplyInput postId={postId.toString()} />
      {replyList.map((reply) => (
        <ReplyItem key={reply.id} reply={reply} />
      ))}
    </div>
  );
}

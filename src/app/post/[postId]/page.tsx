import PostDetail from "@/app/components/PostDetail";
import { getPostById } from "@/app/service/post.service"

export default async function DetailPosts({ params }: { params: { postId: string } }) {
    const postId = parseInt(params.postId)
    const detailPost = await getPostById(postId);
        return (
          <>
            <PostDetail detailPost={detailPost} />
          </>
        );
}

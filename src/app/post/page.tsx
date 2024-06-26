import PostList from "../components/Post/PostList";
import { getAllPosts } from "../service/post.service";

export default async function PostPage() {
  const posts = await getAllPosts();
  return (
    <>
      <PostList posts={posts} />
    </>
  );
}

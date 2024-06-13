import PostCreateUpdate from "@/app/components/PostCreateUpdate";

type UpdatePostPageProps = {
  params: {
    postId: string;
  };
};

export default async function UpdatePost({ params }: UpdatePostPageProps) {
  return <PostCreateUpdate params={params} />;
}

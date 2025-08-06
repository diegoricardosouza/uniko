import { getPostsAction } from "@/app/actions/posts/get-posts";
import { BreadcrumbUsers } from "../_components/BreadcrumbUsers";
import { PostsDataTable } from "./_components/PostsDataTable";

export default async function Posts() {
  const posts = await getPostsAction();

  return (
    <div>
      <BreadcrumbUsers />

      <div className="flex flex-1 flex-col p-4 pt-0">
        <PostsDataTable
          posts={posts || []}
        />
      </div>
    </div>
  )
}
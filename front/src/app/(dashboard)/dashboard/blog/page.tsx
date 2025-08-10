import { getPostsAction } from "@/app/actions/posts/get-posts";

import { BreadcrumbPosts } from "../_components/BreadcrumbPosts";
import { PostsDataTable } from "./_components/PostsDataTable";

export default async function Posts() {
  const posts = await getPostsAction();

  return (
    <div>
      <BreadcrumbPosts />

      <div className="flex flex-1 flex-col p-4 pt-0">
        <PostsDataTable
          posts={posts || []}
        />
      </div>
    </div>
  )
}
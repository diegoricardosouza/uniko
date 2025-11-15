import { getPagesAction } from "@/app/actions/pages/get-pages";
import { getPostsAction } from "@/app/actions/posts/get-posts";
import { getUsersAction } from "@/app/actions/users/get-users";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { BreadcrumbDashboard } from "./_components/BreadcrumbDashboard";
import { ButtonsDashboard } from "./_components/ButtonsDashboard";
import { CardStats } from "./_components/CardStats";

export default async function Dashboard() {
  const [posts, users, pages] = await Promise.all([
    getPostsAction(),
    getUsersAction(),
    getPagesAction()
  ]);

  const stats = [
    {
      title: "Posts do Blog",
      value: posts?.length || "0",
      icon: "Newspaper",
      label: 'Posts'
    },
    {
      title: "Usuários Ativos",
      value: users?.length || "0",
      icon: "Users",
      label: 'Usuários'
    },
    {
      title: "Páginas Criadas",
      value: pages?.length || "0",
      icon: "NotebookText",
      label: 'Páginas'
    },
  ];

  const recentPosts = posts.slice(0, 3)

  return (
    <div>
      <BreadcrumbDashboard />

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Bem-vindo ao painel de controle</p>
          </div>

          {/* Stats Cards */}
          <CardStats stats={stats} />

          <div className="grid gap-6">
            {/* Recent Blog Posts */}
            <Card className="bg-gradient-card shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Posts Recentes</CardTitle>
                    <CardDescription>Últimas publicações do blog</CardDescription>
                  </div>
                  <Link href="/dashboard/blog">
                    <Button variant="outline" size="sm">
                      Ver todos
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="p-3 bg-accent rounded-lg">
                      <p className="font-medium">{post.name}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mt-1">
                        <span>{post.categories?.[0].name}</span>
                        <span>{new Date(post.createdAt!).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <ButtonsDashboard />
        </div>
      </div>
    </div>
  )
}

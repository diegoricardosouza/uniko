import { getPagesAction } from "@/app/actions/pages/get-pages";
import { getPostsAction } from "@/app/actions/posts/get-posts";
import { getPropertiesAction } from "@/app/actions/properties/get-properties";
import { getUsersAction } from "@/app/actions/users/get-users";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { BreadcrumbDashboard } from "./_components/BreadcrumbDashboard";
import { ButtonsDashboard } from "./_components/ButtonsDashboard";
import { CardStats } from "./_components/CardStats";

export default async function Dashboard() {
  const [posts, users, pages, properties] = await Promise.all([
    getPostsAction(),
    getUsersAction(),
    getPagesAction(),
    getPropertiesAction()
  ]);

  const stats = [
    {
      title: "Total de Imóveis",
      value: properties.length || "0",
      icon: "Building",
      label: 'Imóveis'
    },
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

  const recentProperties = properties.slice(0, 3)
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Properties */}
            <Card className="bg-gradient-card shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Imóveis Recentes</CardTitle>
                    <CardDescription>Últimos imóveis cadastrados</CardDescription>
                  </div>
                  <Link href="/dashboard/properties">
                    <Button variant="outline" size="sm">
                      Ver todos
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProperties.map((property) => (
                    <div key={property.id} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                      <div>
                        <p className="font-medium">{property.title}</p>
                        <p className="text-sm text-muted-foreground">{property.types?.[0]?.name ?? ""}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {property.price
                            ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(property.price))
                            : ""}
                        </p>
                        <p className={`text-xs ${property.finalities?.[0]?.name === 'Venda' ? 'text-primary' : 'text-muted-foreground'}`}>
                          {property.finalities?.[0]?.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

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

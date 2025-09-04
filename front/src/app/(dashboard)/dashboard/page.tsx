import { getPagesAction } from "@/app/actions/pages/get-pages";
import { getPostsAction } from "@/app/actions/posts/get-posts";
import { getUsersAction } from "@/app/actions/users/get-users";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Newspaper, NotebookText, Users } from "lucide-react";
import Link from "next/link";
import { BreadcrumbDashboard } from "./_components/BreadcrumbDashboard";

export default async function Dashboard() {
  const [posts, users, pages] = await Promise.all([
    getPostsAction(),
    getUsersAction(),
    getPagesAction(),
  ]);

  const stats = [
    {
      title: "Total de Imóveis",
      value: "127",
      icon: Building,
      label: 'Imóveis'
    },
    {
      title: "Posts do Blog",
      value: posts?.length || "0",
      icon: Newspaper,
      label: 'Posts'
    },
    {
      title: "Usuários Ativos",
      value: users?.length || "0",
      icon: Users,
      label: 'Usuários'
    },
    {
      title: "Páginas Criadas",
      value: pages?.length || "0",
      icon: NotebookText,
      label: 'Páginas'
    },
  ];

  const recentProperties = [
    { id: 1, title: "Casa Moderna no Centro", type: "Casa", price: "R$ 450.000", status: "Disponível" },
    { id: 2, title: "Apartamento Vista Mar", type: "Apartamento", price: "R$ 320.000", status: "Vendido" },
    { id: 3, title: "Cobertura Duplex", type: "Cobertura", price: "R$ 850.000", status: "Disponível" },
  ];

  const recentPosts = [
    { id: 1, title: "Como escolher o imóvel ideal", author: "Admin", date: "2024-01-15" },
    { id: 2, title: "Tendências do mercado imobiliário", author: "Admin", date: "2024-01-12" },
    { id: 3, title: "Dicas para primeira compra", author: "Admin", date: "2024-01-10" },
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.title} className="bg-gradient-card shadow-md transition-smooth hover:shadow-dropdown">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stat.value} 
                    <span className="font-light text-lg"> {stat.label}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

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
                        <p className="text-sm text-muted-foreground">{property.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{property.price}</p>
                        <p className={`text-xs ${property.status === 'Disponível' ? 'text-primary' : 'text-muted-foreground'}`}>
                          {property.status}
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
                      <p className="font-medium">{post.title}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mt-1">
                        <span>Por {post.author}</span>
                        <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="bg-gradient-card shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Ações Rápidas</CardTitle>
              <CardDescription>Acesse rapidamente as principais funcionalidades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/dashboard/properties/new">
                  <Button variant="outline" className="w-full h-20 flex flex-col gap-2 transition-smooth hover:bg-primary hover:text-primary-foreground">
                    <Building className="h-6 w-6" />
                    <span>Novo Imóvel</span>
                  </Button>
                </Link>
                <Link href="/dashboard/blog/new">
                  <Button variant="outline" className="w-full h-20 flex flex-col gap-2 transition-smooth hover:bg-primary hover:text-primary-foreground">
                    <Newspaper className="h-6 w-6" />
                    <span>Novo Post</span>
                  </Button>
                </Link>
                <Link href="/dashboard/users/new">
                  <Button variant="outline" className="w-full h-20 flex flex-col gap-2 transition-smooth hover:bg-primary hover:text-primary-foreground">
                    <Users className="h-6 w-6" />
                    <span>Novo Usuário</span>
                  </Button>
                </Link>
                <Link href="/dashboard/pages/new">
                  <Button variant="outline" className="w-full h-20 flex flex-col gap-2 transition-smooth hover:bg-primary hover:text-primary-foreground">
                    <NotebookText className="h-6 w-6" />
                    <span>Páginas</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

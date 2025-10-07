'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Building, Newspaper, NotebookText, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function ButtonsDashboard() {
  const session = useSession();

  return (
    <Card className="bg-gradient-card shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Ações Rápidas</CardTitle>
        <CardDescription>Acesse rapidamente as principais funcionalidades</CardDescription>
      </CardHeader>
      <CardContent>
        <div 
          className={cn(
            'grid gap-4',
            session.data?.user.role !== 'EDITOR' && 'grid-cols-2 md:grid-cols-4',
            session.data?.user.role === 'EDITOR' && 'grid-cols-2 md:grid-cols-3'
          )}
        >
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
          {session.data?.user.role !== 'EDITOR' && (
            <Link href="/dashboard/users/new">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2 transition-smooth hover:bg-primary hover:text-primary-foreground">
                <Users className="h-6 w-6" />
                <span>Novo Usuário</span>
              </Button>
            </Link>
          )}
          <Link href="/dashboard/pages/new">
            <Button variant="outline" className="w-full h-20 flex flex-col gap-2 transition-smooth hover:bg-primary hover:text-primary-foreground">
              <NotebookText className="h-6 w-6" />
              <span>Páginas</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
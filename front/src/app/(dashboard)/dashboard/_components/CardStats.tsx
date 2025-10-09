'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";
import { useSession } from "next-auth/react";

interface CardStatsProps {
  stats: {
    title: string;
    value: string | number;
    icon: string; // Agora é uma string com o nome do ícone
    label: string;
  }[]
}

export function CardStats({ stats }: CardStatsProps) {
  const session = useSession();
  const role = session.data?.user.role
  const statsFiltered = role !== 'ADMIN' ? stats.filter((stat) => stat.label !== 'Usuários') : stats

  return (
    <div className={cn(
      'grid gap-6',
      session.data?.user.role !== 'EDITOR' && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      session.data?.user.role === 'EDITOR' && 'grid-cols-1 md:grid-cols-3'
    )}>
      {statsFiltered.map((stat) => {
        // Busca o ícone dinamicamente pelo nome
        const Icon = LucideIcons[stat.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;

        return (
          <Card key={stat.title} className="bg-gradient-card shadow-md transition-smooth hover:shadow-dropdown">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              {Icon && <Icon className="h-5 w-5 text-primary" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stat.value}
                <span className="font-light text-lg"> {stat.label}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  )
}
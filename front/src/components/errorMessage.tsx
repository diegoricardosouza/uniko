"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertCircle, X } from "lucide-react";

interface ErrorMessageProps {
  onClose: () => void;
  className?: string;
}

export function ErrorMessage({ onClose, className }: ErrorMessageProps) {
  return (
    <Card className={cn(
      "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950 py-5",
      className
    )}>
      <CardContent className="p-4 py-0">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Erro ao enviar mensagem</h3>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                Não foi possível enviar sua mensagem no momento. Tente novamente mais tarde.
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-red-600 hover:text-red-800 hover:bg-transparent p-1 h-auto"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

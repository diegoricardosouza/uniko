"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle, X } from "lucide-react";

interface SuccessMessageProps {
  onClose: () => void,
  className?: string;
}

export function SuccessMessage({ onClose, className }: SuccessMessageProps) {
  return (
    <Card className={cn(
      "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950 py-5",
      className
    )}>
      <CardContent className="p-4 py-0">
        <div className="flex items-start space-x-3">
          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div>
              <h3 className="text-sm font-medium text-green-800 dark:text-green-200">Mensagem enviada com sucesso!</h3>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                Obrigado pelo seu contato. Recebemos sua mensagem e retornaremos em breve. 
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-green-600 hover:text-green-800 hover:bg-transparent p-1 h-auto"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

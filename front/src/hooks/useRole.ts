import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export function useRole() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useRole deve ser usado dentro de um AuthProvider');
  }
  return context;
}
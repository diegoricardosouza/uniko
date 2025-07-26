import { User } from "@/entities/User";
import { usersService } from "@/services/usersService";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useUsersController() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const userLogged = useSession();

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      const response = await usersService.getAll();

      setUsers(response);
      setIsLoading(false);
    }

    getUser()
  }, [])

  function handleDeleteUser(id: string) {
    console.log('userdelete', id);
    
  }

  return {
    handleDeleteUser,
    users,
    isLoading,
    user: userLogged.data?.user
  }
}
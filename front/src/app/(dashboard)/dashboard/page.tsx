'use client';

import { useSession } from "next-auth/react";

export default function Dashboard() {
    const session = useSession();

  console.log(session.data?.accessToken);
    

    return (
      <div>teste</div>
    )
}
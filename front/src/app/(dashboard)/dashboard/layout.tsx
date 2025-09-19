 
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // try {
  //   await usersService.me();
  // } catch (error: any) {
  //   if (error.status === 401) {
  //     console.log('logout');
  //     return <Unauthorize />
  //   }
  // }
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

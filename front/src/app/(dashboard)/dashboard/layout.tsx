/* eslint-disable @typescript-eslint/no-explicit-any */

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar";
import { usersService } from "@/services/usersService";
import { Geist, Geist_Mono } from "next/font/google";
import Unauthorize from "./Unauthorize";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    await usersService.me();
  } catch (error: any) {
    if (error.status === 401) {
      console.log('logout');
      return <Unauthorize />
    }
  }
  
  return (
    <SidebarProvider className={`${geistSans.variable} ${geistMono.variable}`}>
      <AppSidebar />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

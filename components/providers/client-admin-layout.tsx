"use client"

import { ProtectedAdminLayout } from "@/components/auth/protected-admin-layout"

interface ClientAdminLayoutProps {
  children: React.ReactNode
}

export function ClientAdminLayout({ children }: ClientAdminLayoutProps) {
  return <ProtectedAdminLayout>{children}</ProtectedAdminLayout>
}

import type React from "react"
import { AdminNav } from "@/components/admin/admin-nav"
import { ProtectedAdminLayout } from "@/components/auth/protected-admin-layout"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedAdminLayout>
      <div className="min-h-screen bg-vintage-cream">
        <AdminNav />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </div>
    </ProtectedAdminLayout>
  )
}

import type React from "react"
import { AdminNav } from "@/components/admin/admin-nav"
import { ClientAdminLayout } from "@/components/providers/client-admin-layout"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientAdminLayout>
      <div className="min-h-screen bg-vintage-cream">
        <AdminNav />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </div>
    </ClientAdminLayout>
  )
}

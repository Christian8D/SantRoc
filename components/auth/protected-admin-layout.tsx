"use client"

import { useAuth } from "@/lib/auth-context"
import { LoginForm } from "@/components/auth/login-form"
import { Loader2 } from "lucide-react"

interface ProtectedAdminLayoutProps {
  children: React.ReactNode
}

export function ProtectedAdminLayout({ children }: ProtectedAdminLayoutProps) {
  const { user, loading, signOut } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-vintage-cream flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  return (
    <div>
      {children}
    </div>
  )
}

"use client"

import Link from "next/link"
import { Home, LogOut } from "lucide-react"
import { Button } from "../ui/button"
import { useAuth } from "@/lib/auth-context"

export function AdminNav() {
  const { signOut } = useAuth()

  return (
    <nav className="bg-vintage-dark border-b border-vintage-brown">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="groovy-title text-2xl text-vintage-tan">
            Sant Roc Admin
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 bg-vintage-tan text-vintage-dark rounded hover:bg-vintage-brown hover:text-vintage-cream transition-colors"
          >
            <Home className="w-4 h-4" />
            View Site
          </Link>
          
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 px-4 py-2 bg-vintage-tan text-vintage-dark rounded hover:bg-vintage-brown hover:text-vintage-cream transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  )
}

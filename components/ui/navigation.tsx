"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, Calendar, Eye, FileText, User, LogOut } from "lucide-react"

const navigationItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Personas",
    href: "/personas",
    icon: Users,
  },
  {
    name: "Eventos",
    href: "/eventos",
    icon: Calendar,
  },
  {
    name: "Misión & Visión",
    href: "/mision-vision",
    icon: Eye,
  },
  {
    name: "Instrucciones",
    href: "/instrucciones",
    icon: FileText,
  },
  {
    name: "Perfil",
    href: "/perfil",
    icon: User,
  },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium",
                    isActive ? "bg-white text-blue-900 shadow-md" : "text-white hover:bg-blue-700/80",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-white hover:bg-blue-700"
            onClick={() => {
              console.log("Logout clicked")
            }}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Salir (Nelcy)
          </Button>
        </div>
      </div>
    </nav>
  )
}

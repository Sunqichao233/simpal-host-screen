import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "菜单编辑器",
  description: "餐厅菜单编辑系统",
}

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}

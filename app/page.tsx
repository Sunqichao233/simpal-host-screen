'use client'
import { TerminalClockIn } from "@/components/terminal-clock-in"
import { SidebarLayout } from "@/components/sidebar-layout"
import { Dashboard } from "@/components/dashboard"
import { useAuth } from "@/contexts/auth-context"

export default function Page() {
  const { isAuthenticated, employeeId } = useAuth()
  
  console.log('页面渲染，认证状态:', isAuthenticated, '员工ID:', employeeId)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600">当前认证状态: {isAuthenticated ? '已认证' : '未认证'}</p>
        </div>
        <TerminalClockIn />
      </div>
    )
  }

  return (
    <SidebarLayout>
      <Dashboard />
    </SidebarLayout>
  )
}
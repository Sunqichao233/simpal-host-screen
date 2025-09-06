'use client'
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { TerminalClockIn } from "@/components/terminal-clock-in"

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showNetworkSetup, setShowNetworkSetup] = useState(true)

  useEffect(() => {
    // 检查是否从网络设置页面返回
    const fromNetwork = searchParams.get('from')
    if (fromNetwork === 'network') {
      setShowNetworkSetup(false)
    } else {
      // 首次访问，重定向到网络设置页面
      router.push('/network')
    }
  }, [router, searchParams])

  if (showNetworkSetup) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">正在跳转到网络设置...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-4">
        <p className="text-sm text-gray-600">网络设置完成，请进行员工登录</p>
      </div>
      <TerminalClockIn />
    </div>
  )
}
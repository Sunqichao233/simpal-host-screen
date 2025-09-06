import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SIMPAL POS - 网络设置",
  description: "SIMPAL POS 系统网络配置",
}

export default function NetworkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}

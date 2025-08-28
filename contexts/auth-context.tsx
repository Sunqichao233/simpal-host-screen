'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  employeeId: string | null
  login: (employeeId: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [employeeId, setEmployeeId] = useState<string | null>(null)

  const login = (inputEmployeeId: string): boolean => {
    console.log('认证上下文：尝试登录，输入的员工编号:', inputEmployeeId)
    // 默认员工编号是 123456
    if (inputEmployeeId === '123456') {
      console.log('认证上下文：员工编号正确，设置认证状态为true')
      setIsAuthenticated(true)
      setEmployeeId(inputEmployeeId)
      console.log('认证上下文：状态更新完成')
      return true
    }
    console.log('认证上下文：员工编号错误')
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    setEmployeeId(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, employeeId, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

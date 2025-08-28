'use client'
import { useState } from 'react'
import { Button } from './ui/button'
import { Delete, X } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'

export function TerminalClockIn() {
  const [employeeId, setEmployeeId] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()

  const handleNumberClick = (number: string) => {
    if (employeeId.length < 8) { // Limit to 8 digits
      setEmployeeId(prev => prev + number)
      setError('') // Clear error when user starts typing
    }
  }

  const handleClear = () => {
    setEmployeeId('')
    setError('')
  }

  const handleBackspace = () => {
    setEmployeeId(prev => prev.slice(0, -1))
    setError('')
  }

  const handleClockIn = () => {
    if (employeeId.length > 0) {
      console.log('尝试登录，员工编号:', employeeId)
      const success = login(employeeId)
      console.log('登录结果:', success)
      if (!success) {
        setError('无效的员工编号，请重试')
        setEmployeeId('')
      } else {
        console.log('登录成功，应该跳转到主界面')
        // 添加一个小延迟来确保状态更新
        setTimeout(() => {
          console.log('延迟后检查认证状态')
        }, 100)
      }
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      {/* Title */}
      <h1 className="text-4xl text-center text-black font-medium">
        Host Clock In
      </h1>
      
      {/* Display Screen */}
      <div className="bg-black text-white p-6 rounded-lg border-2 border-gray-800">
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-2">Employee ID</p>
          <div className="text-2xl font-mono h-8 flex items-center justify-center">
            {employeeId || '_'}
          </div>
          {error && (
            <p className="text-red-400 text-sm mt-2">{error}</p>
          )}
        </div>
      </div>

      {/* Number Pad */}
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <Button
            key={number}
            onClick={() => handleNumberClick(number.toString())}
            variant="outline"
            className="h-16 text-xl border-2 border-black text-black hover:bg-black hover:text-white transition-colors"
          >
            {number}
          </Button>
        ))}
        
        {/* Clear Button */}
        <Button
          onClick={handleClear}
          variant="outline"
          className="h-16 text-lg border-2 border-black text-black hover:bg-black hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </Button>
        
        {/* Zero Button */}
        <Button
          onClick={() => handleNumberClick('0')}
          variant="outline"
          className="h-16 text-xl border-2 border-black text-black hover:bg-black hover:text-white transition-colors"
        >
          0
        </Button>
        
        {/* Backspace Button */}
        <Button
          onClick={handleBackspace}
          variant="outline"
          className="h-16 text-lg border-2 border-black text-black hover:bg-black hover:text-white transition-colors"
        >
          <Delete className="w-5 h-5" />
        </Button>
      </div>

      {/* Clock In Button */}
      <Button 
        onClick={handleClockIn}
        disabled={employeeId.length === 0}
        className="w-full h-16 text-xl bg-black text-white hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 border-2 border-black"
        size="lg"
      >
        Clock In
      </Button>
    </div>
  )
}

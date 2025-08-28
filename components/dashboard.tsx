'use client'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Users, Clock, TrendingUp, AlertCircle } from 'lucide-react'

export function Dashboard() {
  const stats = [
    {
      title: 'Online Staff',
      value: '24',
      icon: Users,
      change: '+2',
      changeType: 'positive' as const
    },
    {
      title: 'Today Clock-ins',
      value: '156',
      icon: Clock,
      change: '+12',
      changeType: 'positive' as const
    },
    {
      title: 'Monthly Growth',
      value: '8.2%',
      icon: TrendingUp,
      change: '+1.4%',
      changeType: 'positive' as const
    },
    {
      title: 'Pending Tasks',
      value: '3',
      icon: AlertCircle,
      change: '-2',
      changeType: 'negative' as const
    }
  ]

  const recentActivities = [
    { time: '09:15', action: 'Employee 001 clocked in', type: 'clock-in' },
    { time: '09:12', action: 'Employee 045 clocked in', type: 'clock-in' },
    { time: '09:08', action: 'Employee 023 clocked in', type: 'clock-in' },
    { time: '08:55', action: 'System backup completed', type: 'system' },
  ]

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">View system overview and recent activities</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <Badge 
                    variant={stat.changeType === 'positive' ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {stat.change}
                  </Badge>
                </div>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">
                <stat.icon className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Server Status</span>
              <Badge variant="default">Online</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Database Connection</span>
              <Badge variant="default">Connected</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Last Backup</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">System Load</span>
              <span className="text-sm text-gray-500">Low</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

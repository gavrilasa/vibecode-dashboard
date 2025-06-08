'use client';

import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Trophy, 
  FileText, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  TrendingUp,
  Calendar
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  // Mock data (replace with actual API calls)
  const stats = {
    totalRegistrations: 142,
    totalTeams: 38,
    pendingReviews: 15,
    activeCompetitions: 3,
    approvedRegistrations: 98,
    rejectedRegistrations: 12,
  };

  const recentActivities = [
    {
      id: 1,
      type: 'registration',
      message: 'New registration from John Doe for UI/U Competition',
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      type: 'team',
      message: 'Team "Innovators" updated their information',
      timestamp: '4 hours ago',
    },
    {
      id: 3,
      type: 'document',
      message: 'Document uploaded by Jane Smith requires review',
      timestamp: '6 hours ago',
    },
    {
      id: 4,
      type: 'approval',
      message: 'Registration approved for Team Alpha',
      timestamp: '1 day ago',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Overview of competition management and statistics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Registrations"
          value={stats.totalRegistrations}
          icon={Users}
          className="border-blue-200"
        />
        <DashboardCard
          title="Active Teams"
          value={stats.totalTeams}
          icon={Trophy}
          className="border-green-200"
        />
        <DashboardCard
          title="Pending Reviews"
          value={stats.pendingReviews}
          icon={Clock}
          className="border-yellow-200"
        />
        <DashboardCard
          title="Active Competitions"
          value={stats.activeCompetitions}
          icon={FileText}
          className="border-purple-200"
        />
      </div>

      {/* Registration Status Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Approved Registrations"
          value={stats.approvedRegistrations}
          icon={CheckCircle}
          className="border-green-200"
        />
        <DashboardCard
          title="Rejected Registrations"
          value={stats.rejectedRegistrations}
          icon={AlertTriangle}
          className="border-red-200"
        />
        <DashboardCard
          title="Approval Rate"
          value={`${Math.round((stats.approvedRegistrations / stats.totalRegistrations) * 100)}%`}
          icon={TrendingUp}
          className="border-blue-200"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Recent Activities</span>
            </CardTitle>
            <CardDescription>
              Latest activities across the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      {activity.type === 'registration' && <Users className="h-4 w-4 text-blue-600" />}
                      {activity.type === 'team' && <Trophy className="h-4 w-4 text-blue-600" />}
                      {activity.type === 'document' && <FileText className="h-4 w-4 text-blue-600" />}
                      {activity.type === 'approval' && <CheckCircle className="h-4 w-4 text-blue-600" />}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/registrations">
                <FileText className="mr-2 h-4 w-4" />
                Review Pending Registrations
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/teams">
                <Users className="mr-2 h-4 w-4" />
                Manage Teams
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/registrations">
                <Trophy className="mr-2 h-4 w-4" />
                View All Registrations
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/teams">
                <CheckCircle className="mr-2 h-4 w-4" />
                Export Reports
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Competition Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Competition Overview</CardTitle>
          <CardDescription>
            Current active competitions and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">UI/UX Design Competition</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">85 registrations</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">Ends: July 30, 2025</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="font-semibold text-green-900 dark:text-green-100">CTF Competition</h3>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">42 registrations</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-2">Ends: July 30, 2025</p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100">FTL Competition</h3>
              <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">15 registrations</p>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">Ends: July 30, 2025</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { Bell, CheckCircle, AlertCircle, Info, Calendar, Trophy } from 'lucide-react';

export default function NotificationsPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Registration Approved',
      message: 'Your registration for UI/UX Design Competition has been approved. You can now upload your preliminary submission.',
      timestamp: '2025-01-12T09:30:00.000Z',
      read: false,
    },
    {
      id: 2,
      type: 'info',
      title: 'Document Uploaded Successfully',
      message: 'Your validation document has been uploaded and is now under review. You will be notified once it is processed.',
      timestamp: '2025-01-11T14:20:00.000Z',
      read: false,
    },
    {
      id: 3,
      type: 'warning',
      title: 'Deadline Reminder',
      message: 'Reminder: Preliminary submission deadline is in 5 days. Make sure to upload your files before June 30, 2025.',
      timestamp: '2025-01-10T10:00:00.000Z',
      read: true,
    },
    {
      id: 4,
      type: 'info',
      title: 'Team Formation',
      message: 'You have been added to team "Innovators". Check your team details in the dashboard.',
      timestamp: '2025-01-09T16:45:00.000Z',
      read: true,
    },
    {
      id: 5,
      type: 'success',
      title: 'Welcome to The Ace!',
      message: 'Welcome to The Ace competition platform. Complete your profile and select a competition to get started.',
      timestamp: '2025-01-08T12:00:00.000Z',
      read: true,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800">Success</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      case 'info':
      default:
        return <Badge className="bg-blue-100 text-blue-800">Info</Badge>;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Notifications
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Stay updated with important competition announcements
            </p>
          </div>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="text-sm">
              {unreadCount} unread
            </Badge>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className={`transition-all ${
              !notification.read 
                ? 'border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-900/10' 
                : 'hover:shadow-md'
            }`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-base">{notification.title}</CardTitle>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                      <CardDescription className="mt-1">
                        {new Date(notification.timestamp).toLocaleDateString('en-US', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </CardDescription>
                    </div>
                  </div>
                  {getNotificationBadge(notification.type)}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-700 dark:text-gray-300">
                  {notification.message}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {notifications.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No notifications yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                When you have notifications, they'll appear here.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notification Preferences</span>
            </CardTitle>
            <CardDescription>
              Manage how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Receive notifications via email
                  </p>
                </div>
                <Badge variant="outline">Enabled</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Competition Updates</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Updates about your registered competitions
                  </p>
                </div>
                <Badge variant="outline">Enabled</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Deadline Reminders</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Reminders for important deadlines
                  </p>
                </div>
                <Badge variant="outline">Enabled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
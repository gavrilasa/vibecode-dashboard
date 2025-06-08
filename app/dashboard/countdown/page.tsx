'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { CountdownCard } from '@/components/dashboard/CountdownCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Calendar, Clock, Trophy } from 'lucide-react';

export default function CountdownPage() {
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

  // Mock competition dates (replace with actual data)
  const competitionEvents = [
    {
      title: 'Registration Deadline',
      date: new Date('2025-06-15T23:59:59.000Z'),
      description: 'Last day to register for the competition',
    },
    {
      title: 'Preliminary Round',
      date: new Date('2025-06-30T09:00:00.000Z'),
      description: 'Preliminary submissions due',
    },
    {
      title: 'Final Round',
      date: new Date('2025-07-15T09:00:00.000Z'),
      description: 'Final presentations and judging',
    },
    {
      title: 'Competition End',
      date: new Date('2025-07-30T23:59:59.000Z'),
      description: 'Award ceremony and closing',
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Competition Countdown
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Important dates and deadlines for the competition
          </p>
        </div>

        {/* Countdown Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {competitionEvents.map((event, index) => (
            <CountdownCard
              key={index}
              targetDate={event.date}
              title={event.title}
            />
          ))}
        </div>

        {/* Event Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Event Schedule</span>
            </CardTitle>
            <CardDescription>
              Detailed timeline for the competition
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {competitionEvents.map((event, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      {index === 0 && <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                      {index === 1 && <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                      {index === 2 && <Trophy className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                      {index === 3 && <Trophy className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {event.description}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                      {event.date.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Important Reminders</CardTitle>
            <CardDescription>
              Things to remember as deadlines approach
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>Make sure to upload all required documents before the deadline</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>Complete your team formation if participating in a team competition</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>Check your email regularly for updates and announcements</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>Prepare your submission materials well in advance</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
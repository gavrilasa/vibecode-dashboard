'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const biodataSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  university: z.string().min(2, 'University name is required'),
  major: z.string().min(2, 'Major is required'),
  studentId: z.string().min(5, 'Student ID is required'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  emergencyContact: z.string().min(10, 'Emergency contact is required'),
  motivation: z.string().min(50, 'Motivation must be at least 50 characters'),
});

type BiodataFormData = z.infer<typeof biodataSchema>;

export default function EditBiodataPage() {
  const { isAuthenticated, user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  // Mock current biodata
  const currentBiodata = {
    fullName: user?.name || 'John Doe',
    phone: '+62 812 3456 7890',
    university: 'Universitas Diponegoro',
    major: 'Computer Science',
    studentId: '21120121130001',
    address: 'Jl. Prof. Soedarto No.13, Tembalang, Semarang, Jawa Tengah 50275',
    emergencyContact: '+62 812 9876 5432',
    motivation: 'I am passionate about technology and innovation. Participating in this competition will help me develop my skills and network with like-minded individuals.',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BiodataFormData>({
    resolver: zodResolver(biodataSchema),
    defaultValues: currentBiodata,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: BiodataFormData) => {
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      // In a real app, you would send this data to your backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess('Biodata updated successfully!');
      setTimeout(() => {
        router.push('/dashboard/biodata');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to update biodata');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard/biodata">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Biodata
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Edit Biodata
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Update your personal information
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {success && (
                <Alert>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    {...register('fullName')}
                    className={errors.fullName ? 'border-red-500' : ''}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-500">{errors.fullName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="university">University</Label>
                  <Input
                    id="university"
                    {...register('university')}
                    className={errors.university ? 'border-red-500' : ''}
                  />
                  {errors.university && (
                    <p className="text-sm text-red-500">{errors.university.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="major">Major</Label>
                  <Input
                    id="major"
                    {...register('major')}
                    className={errors.major ? 'border-red-500' : ''}
                  />
                  {errors.major && (
                    <p className="text-sm text-red-500">{errors.major.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    {...register('studentId')}
                    className={errors.studentId ? 'border-red-500' : ''}
                  />
                  {errors.studentId && (
                    <p className="text-sm text-red-500">{errors.studentId.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    type="tel"
                    {...register('emergencyContact')}
                    className={errors.emergencyContact ? 'border-red-500' : ''}
                  />
                  {errors.emergencyContact && (
                    <p className="text-sm text-red-500">{errors.emergencyContact.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  {...register('address')}
                  className={errors.address ? 'border-red-500' : ''}
                  rows={3}
                />
                {errors.address && (
                  <p className="text-sm text-red-500">{errors.address.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivation">Motivation</Label>
                <Textarea
                  id="motivation"
                  placeholder="Tell us why you want to participate in this competition..."
                  {...register('motivation')}
                  className={errors.motivation ? 'border-red-500' : ''}
                  rows={4}
                />
                {errors.motivation && (
                  <p className="text-sm text-red-500">{errors.motivation.message}</p>
                )}
              </div>

              <div className="flex space-x-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Update Biodata
                    </>
                  )}
                </Button>
                <Button asChild variant="outline">
                  <Link href="/dashboard/biodata">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
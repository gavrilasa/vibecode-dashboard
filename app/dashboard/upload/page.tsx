'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { UploadForm } from '@/components/upload/UploadForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { FileText, Upload, CheckCircle, AlertCircle } from 'lucide-react';

export default function UploadPage() {
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

  // Mock competition name (replace with actual data)
  const competitionName = 'UI/UX Design Competition';
  
  // Mock uploaded documents
  const uploadedDocuments = [
    {
      id: 1,
      filename: 'student_id_card.pdf',
      type: 'VALIDATION',
      uploadedAt: '2025-01-12T10:30:00.000Z',
      status: 'approved',
    },
    {
      id: 2,
      filename: 'preliminary_design.pdf',
      type: 'PENYISIHAN',
      uploadedAt: '2025-01-10T14:20:00.000Z',
      status: 'pending',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case 'VALIDATION':
        return 'Validation Document';
      case 'PENYISIHAN':
        return 'Preliminary Submission';
      case 'FINAL':
        return 'Final Submission';
      default:
        return type;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Upload Documents
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Upload required documents for {competitionName}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upload Form */}
          <div>
            <UploadForm competitionName={competitionName} />
          </div>

          {/* Upload Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Upload Guidelines</span>
              </CardTitle>
              <CardDescription>
                Please read these guidelines before uploading
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 dark:text-white">File Requirements:</h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Only PDF files are accepted</li>
                  <li>• Maximum file size: 10MB</li>
                  <li>• Files must be clearly legible</li>
                  <li>• Use descriptive filenames</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 dark:text-white">Document Types:</h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>• <strong>Validation:</strong> Student ID, transcript, etc.</li>
                  {competitionName.toLowerCase().includes('ui/ux') && (
                    <>
                      <li>• <strong>Preliminary:</strong> Initial design submission</li>
                      <li>• <strong>Final:</strong> Final design and presentation</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Note:</strong> All documents will be reviewed by our team. 
                  You'll receive an email notification once your documents are processed.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Uploaded Documents */}
        {uploadedDocuments.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Uploaded Documents</span>
              </CardTitle>
              <CardDescription>
                Documents you have already uploaded
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {uploadedDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(doc.status)}
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {doc.filename}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {getDocumentTypeLabel(doc.type)} • Uploaded on{' '}
                          {new Date(doc.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(doc.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  Download,
  Users
} from 'lucide-react';
import Link from 'next/link';

export default function AdminRegistrationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [competitionFilter, setCompetitionFilter] = useState('all');

  // Mock registrations data (replace with actual API call)
  const registrations = [
    {
      id: 1,
      userId: 101,
      userName: 'John Doe',
      userEmail: 'john@example.com',
      competitionId: 1,
      competitionName: 'UI/UX Design Competition',
      status: 'PENDING',
      registeredAt: '2025-01-12T10:30:00.000Z',
      university: 'Universitas Diponegoro',
      major: 'Computer Science',
    },
    {
      id: 2,
      userId: 102,
      userName: 'Jane Smith',
      userEmail: 'jane@example.com',
      competitionId: 2,
      competitionName: 'CTF Competition',
      status: 'APPROVED',
      registeredAt: '2025-01-11T14:20:00.000Z',
      university: 'Institut Teknologi Bandung',
      major: 'Cybersecurity',
    },
    {
      id: 3,
      userId: 103,
      userName: 'Bob Johnson',
      userEmail: 'bob@example.com',
      competitionId: 1,
      competitionName: 'UI/UX Design Competition',
      status: 'REJECTED',
      registeredAt: '2025-01-10T09:15:00.000Z',
      university: 'Universitas Indonesia',
      major: 'Design',
    },
    {
      id: 4,
      userId: 104,
      userName: 'Alice Brown',
      userEmail: 'alice@example.com',
      competitionId: 3,
      competitionName: 'FTL Competition',
      status: 'PENDING',
      registeredAt: '2025-01-09T16:45:00.000Z',
      university: 'Universitas Gadjah Mada',
      major: 'Information Technology',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'PENDING':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'REJECTED':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'PENDING':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'REJECTED':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  // Filter registrations based on search and filters
  const filteredRegistrations = registrations.filter((registration) => {
    const matchesSearch = 
      registration.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.competitionName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || registration.status === statusFilter;
    const matchesCompetition = competitionFilter === 'all' || registration.competitionId.toString() === competitionFilter;
    
    return matchesSearch && matchesStatus && matchesCompetition;
  });

  const stats = {
    total: registrations.length,
    pending: registrations.filter(r => r.status === 'PENDING').length,
    approved: registrations.filter(r => r.status === 'APPROVED').length,
    rejected: registrations.filter(r => r.status === 'REJECTED').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Registrations Management
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage and review all competition registrations
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold">{stats.approved}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold">{stats.rejected}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or competition..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="APPROVED">Approved</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Competition</label>
              <Select value={competitionFilter} onValueChange={setCompetitionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All competitions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Competitions</SelectItem>
                  <SelectItem value="1">UI/UX Design Competition</SelectItem>
                  <SelectItem value="2">CTF Competition</SelectItem>
                  <SelectItem value="3">FTL Competition</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Registrations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Registrations ({filteredRegistrations.length})</CardTitle>
          <CardDescription>
            List of all registrations with their current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Participant</TableHead>
                  <TableHead>Competition</TableHead>
                  <TableHead>University</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRegistrations.map((registration) => (
                  <TableRow key={registration.id}>
                    <TableCell className="font-medium">#{registration.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{registration.userName}</p>
                        <p className="text-sm text-gray-500">{registration.userEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{registration.competitionName}</p>
                        <p className="text-sm text-gray-500">ID: {registration.competitionId}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{registration.university}</p>
                        <p className="text-sm text-gray-500">{registration.major}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(registration.status)}
                        {getStatusBadge(registration.status)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(registration.registeredAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/registrations/${registration.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredRegistrations.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No registrations found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
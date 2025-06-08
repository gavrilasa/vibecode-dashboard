'use client';

import { useState } from 'react';
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
  Users, 
  Trophy,
  Download,
  Calendar
} from 'lucide-react';
import Link from 'next/link';

export default function AdminTeamsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [competitionFilter, setCompetitionFilter] = useState('all');

  // Mock teams data (replace with actual API call)
  const teams = [
    {
      id: 'team-uuid-1',
      name: 'Innovators',
      competitionId: 1,
      competitionName: 'UI/UX Design Competition',
      memberCount: 3,
      maxMembers: 3,
      createdAt: '2025-01-10T14:30:00.000Z',
      leader: 'John Doe',
      university: 'Universitas Diponegoro',
    },
    {
      id: 'team-uuid-2',
      name: 'Cyber Warriors',
      competitionId: 2,
      competitionName: 'CTF Competition',
      memberCount: 2,
      maxMembers: 3,
      createdAt: '2025-01-09T10:15:00.000Z',
      leader: 'Jane Smith',
      university: 'Institut Teknologi Bandung',
    },
    {
      id: 'team-uuid-3',
      name: 'Code Breakers',
      competitionId: 3,
      competitionName: 'FTL Competition',
      memberCount: 1,
      maxMembers: 3,
      createdAt: '2025-01-08T16:45:00.000Z',
      leader: 'Alice Brown',
      university: 'Universitas Gadjah Mada',
    },
    {
      id: 'team-uuid-4',
      name: 'Design Masters',
      competitionId: 1,
      competitionName: 'UI/UX Design Competition',
      memberCount: 3,
      maxMembers: 3,
      createdAt: '2025-01-07T09:20:00.000Z',
      leader: 'Bob Johnson',
      university: 'Universitas Indonesia',
    },
  ];

  const getTeamStatusBadge = (memberCount: number, maxMembers: number) => {
    if (memberCount === maxMembers) {
      return <Badge className="bg-green-100 text-green-800">Complete</Badge>;
    } else if (memberCount > 0) {
      return <Badge className="bg-yellow-100 text-yellow-800">Incomplete</Badge>;
    } else {
      return <Badge className="bg-gray-100 text-gray-800">Empty</Badge>;
    }
  };

  // Filter teams based on search and filters
  const filteredTeams = teams.filter((team) => {
    const matchesSearch = 
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.leader.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.competitionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.university.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCompetition = competitionFilter === 'all' || team.competitionId.toString() === competitionFilter;
    
    return matchesSearch && matchesCompetition;
  });

  const stats = {
    total: teams.length,
    complete: teams.filter(t => t.memberCount === t.maxMembers).length,
    incomplete: teams.filter(t => t.memberCount > 0 && t.memberCount < t.maxMembers).length,
    empty: teams.filter(t => t.memberCount === 0).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Teams Management
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage and monitor all competition teams
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
                <p className="text-sm font-medium text-gray-600">Total Teams</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Complete</p>
                <p className="text-2xl font-bold">{stats.complete}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Incomplete</p>
                <p className="text-2xl font-bold">{stats.incomplete}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Empty</p>
                <p className="text-2xl font-bold">{stats.empty}</p>
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
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by team name, leader, or competition..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
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

      {/* Teams Table */}
      <Card>
        <CardHeader>
          <CardTitle>Teams ({filteredTeams.length})</CardTitle>
          <CardDescription>
            List of all teams and their current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team Name</TableHead>
                  <TableHead>Leader</TableHead>
                  <TableHead>Competition</TableHead>
                  <TableHead>University</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeams.map((team) => (
                  <TableRow key={team.id}>
                    <TableCell className="font-medium">{team.name}</TableCell>
                    <TableCell>{team.leader}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{team.competitionName}</p>
                        <p className="text-sm text-gray-500">ID: {team.competitionId}</p>
                      </div>
                    </TableCell>
                    <TableCell>{team.university}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{team.memberCount}/{team.maxMembers}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getTeamStatusBadge(team.memberCount, team.maxMembers)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{new Date(team.createdAt).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/teams/${team.id}`}>
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
          
          {filteredTeams.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No teams found
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
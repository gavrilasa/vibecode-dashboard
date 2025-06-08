'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Competition } from '@/types/competition';
import { Calendar, Users, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

interface CompetitionCardProps {
  competition: Competition;
  onSelect: (competition: Competition) => void;
  selected?: boolean;
}

export function CompetitionCard({ competition, onSelect, selected }: CompetitionCardProps) {
  const startDate = new Date(competition.startDate);
  const endDate = new Date(competition.endDate);
  
  return (
    <Card className={`cursor-pointer transition-all hover:shadow-md ${
      selected ? 'ring-2 ring-blue-500 border-blue-500' : 'hover:border-gray-300'
    }`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{competition.name}</CardTitle>
            <CardDescription className="mt-2">
              {competition.description}
            </CardDescription>
          </div>
          <Badge variant="secondary">
            {competition.maxMembers} members max
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>Start: {format(startDate, 'MMM dd, yyyy')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>End: {format(endDate, 'MMM dd, yyyy')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span>Max {competition.maxMembers} members</span>
          </div>
          {competition.batches.length > 0 && (
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span>From ${competition.batches[0].price}</span>
            </div>
          )}
        </div>

        {competition.batches.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Available Batches:</h4>
            <div className="space-y-1">
              {competition.batches.map((batch) => (
                <div key={batch.id} className="flex justify-between items-center text-xs">
                  <span>{batch.name}</span>
                  <span className="font-medium">${batch.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button 
          onClick={() => onSelect(competition)}
          className="w-full"
          variant={selected ? "default" : "outline"}
        >
          {selected ? 'Selected' : 'Select Competition'}
        </Button>
      </CardContent>
    </Card>
  );
}
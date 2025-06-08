'use client';

import { useState, useCallback } from 'react';
import { getMyTeam, createTeam, updateTeam } from '@/lib/team';
import { Team, CreateTeamRequest, UpdateTeamRequest } from '@/types/team';

export function useTeam() {
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMyTeam = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMyTeam();
      setTeam(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch team');
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (data: CreateTeamRequest): Promise<Team | null> => {
    setLoading(true);
    setError(null);
    try {
      const newTeam = await createTeam(data);
      setTeam(newTeam);
      return newTeam;
    } catch (err: any) {
      setError(err.message || 'Failed to create team');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (data: UpdateTeamRequest): Promise<Team | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedTeam = await updateTeam(data);
      setTeam(updatedTeam);
      return updatedTeam;
    } catch (err: any) {
      setError(err.message || 'Failed to update team');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    team,
    loading,
    error,
    fetchMyTeam,
    create,
    update,
  };
}
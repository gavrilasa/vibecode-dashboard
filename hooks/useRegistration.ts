'use client';

import { useState, useCallback } from 'react';
import { getUserRegistration, createRegistration, uploadDocument } from '@/lib/registration';
import { Registration, CreateRegistrationRequest, UploadDocumentResponse } from '@/types/registration';

export function useRegistration() {
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRegistration = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUserRegistration();
      setRegistration(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch registration');
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data: CreateRegistrationRequest): Promise<Registration | null> => {
    setLoading(true);
    setError(null);
    try {
      const newRegistration = await createRegistration(data);
      setRegistration(newRegistration);
      return newRegistration;
    } catch (err: any) {
      setError(err.message || 'Failed to create registration');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const upload = useCallback(async (
    file: File,
    documentType: 'VALIDATION' | 'PENYISIHAN' | 'FINAL'
  ): Promise<UploadDocumentResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await uploadDocument(file, documentType);
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to upload document');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    registration,
    loading,
    error,
    fetchRegistration,
    register,
    upload,
  };
}
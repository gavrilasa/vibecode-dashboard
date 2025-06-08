import { apiRequest, apiRequestWithFormData } from './api';
import { Registration, CreateRegistrationRequest, UploadDocumentResponse } from '@/types/registration';

export async function getUserRegistration(): Promise<Registration> {
  return apiRequest<Registration>('/registration');
}

export async function getAllRegistrations(): Promise<Registration[]> {
  return apiRequest<Registration[]>('/registration');
}

export async function createRegistration(data: CreateRegistrationRequest): Promise<Registration> {
  return apiRequest<Registration>('/registration', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function uploadDocument(
  file: File,
  documentType: 'VALIDATION' | 'PENYISIHAN' | 'FINAL'
): Promise<UploadDocumentResponse> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('documentType', documentType);

  return apiRequestWithFormData<UploadDocumentResponse>('/registration/upload', formData);
}
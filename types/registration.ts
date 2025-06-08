export interface Registration {
  id: number;
  userId: number;
  competitionId: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface CreateRegistrationRequest {
  competitionId: number;
}

export interface UploadDocumentResponse {
  id: number;
  registrationId: number;
  filename: string;
  filepath: string;
  filetype: string;
  type: 'VALIDATION' | 'PENYISIHAN' | 'FINAL';
}
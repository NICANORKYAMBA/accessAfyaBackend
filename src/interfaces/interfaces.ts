import { MetricType } from '@prisma/client';

export interface AddPatientArgs {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  clinicId: number;
}

export interface AddVisitArgs {
  date: string;
  patientId: number;
  clinicId: number;
}

export interface AddMetricArgs {
  date: string;
  value: number;
  type: MetricType;
  clinicId: number;
  patientId: number;
  visitId: number;
}

export interface UpdateMetricArgs {
  id: number;
  date: string;
  value: number;
  type: MetricType;
}
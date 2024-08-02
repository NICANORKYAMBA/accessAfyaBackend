import { PrismaClient } from '@prisma/client';
import {
  AddPatientArgs,
  AddVisitArgs,
  AddMetricArgs,
  UpdateMetricArgs
} from '../interfaces/interfaces';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    clinics: async () => {
      return await prisma.clinic.findMany({
        include: {
          patients: true,
          visits: true,
          metrics: true
        }
      });
    },
    clinic: async (_: any, { id }: { id: number }) => {
      return await prisma.clinic.findUnique({
        where: {
          id: Number(id)
        },
        include: {
          patients: true,
          visits: true,
          metrics: true
        }
      });
    },
    patients: async () => {
      return await prisma.patient.findMany({
        include: {
          clinic: true,
          visits: true,
          metrics: true
        }
      });
    },
    patient: async (_: any, { id }: { id: number }) => {
      return await prisma.patient.findUnique({
        where: {
          id: Number(id)
        },
        include: {
          clinic: true,
          visits: true,
          metrics: true
        }
      });
    },
    visits: async () => {
      return await prisma.visit.findMany({
        include: {
          patient: true,
          clinic: true,
          metrics: true
        }
      });
    },
    visit: async (_: any, { id }: { id: number }) => {
      return await prisma.visit.findUnique({
        where: {
          id: Number(id)
        }, include: {
          patient: true,
          clinic: true,
          metrics: true
        }
      });
    },
    metrics: async () => {
      return await prisma.metric.findMany();
    },
    metric: async (_: any, { id }: { id: number }) => {
      return await prisma.metric.findUnique({
        where: {
          id: Number(id)
        }
      });
    },
  },
  Mutation: {
    addClinic: async (_: any, { name, address }: { name: string; address: string }) => {
      return await prisma.clinic.create({
        data: { name, address }
      });
    },
    addPatient: async (_: any, { firstName, lastName, dateOfBirth, gender, clinicId }: AddPatientArgs) => {
      return await prisma.patient.create({
        data: {
          firstName,
          lastName,
          dateOfBirth: new Date(dateOfBirth),
          gender, clinic: {
            connect: { id: clinicId }
          }
        }
      });
    },
    addVisit: async (_: any, { date, patientId, clinicId }: AddVisitArgs) => {
      return await prisma.visit.create({
        data: {
          date: new Date(date),
          patient: {
            connect: { id: patientId }
          },
          clinic: { connect: { id: clinicId } }
        }
      });
    },
    addMetric: async (_: any, { date, value, type, clinicId, patientId, visitId }: AddMetricArgs) => {
      return await prisma.metric.create({
        data: {
          date: new Date(date),
          value,
          type,
          clinic: clinicId ? {
            connect: { id: clinicId }
          } : undefined, patient: patientId ? {
            connect: { id: patientId }
          } : undefined, visit: visitId ? {
            connect: { id: visitId }
          } : undefined
        }
      });
    },
    updateMetric: async (_: any, { id, date, value, type }: UpdateMetricArgs) => {
      return await prisma.metric.update({
        where: {
          id: Number(id)
        },
        data: {
          date: date ? new Date(date) : undefined, value, type
        }
      });
    },
    deleteMetric: async (_: any, { id }: { id: number }) => {
      return await prisma.metric.delete({
        where: {
          id: Number(id)
        }
      });
    },
  },
};
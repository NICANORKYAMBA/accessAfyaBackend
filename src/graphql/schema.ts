import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  enum MetricType {
    TEMPERATURE
    BLOOD_PRESSURE
    HEART_RATE
    RESPIRATORY_RATE
    OXYGEN_SATURATION
    BLOOD_GLUCOSE
  }

  type Clinic {
    id: Int
    name: String
    address: String
    patients: [Patient]
    visits: [Visit]
    metrics: [Metric]
  }

  type Patient {
    id: Int
    firstName: String
    lastName: String
    dateOfBirth: String
    gender: String
    clinic: Clinic
    visits: [Visit]
    metrics: [Metric]
  }

  type Visit {
    id: Int
    date: String
    patient: Patient
    clinic: Clinic
    metrics: [Metric]
  }

  type Metric {
    id: Int
    date: String
    value: Float
    type: MetricType
  }

  type Query {
    clinics: [Clinic]
    clinic(id: Int!): Clinic
    patients: [Patient]
    patient(id: Int!): Patient
    visits: [Visit]
    visit(id: Int!): Visit
    metrics: [Metric]
    metric(id: Int!): Metric
  }

  type Mutation {
    addClinic(name: String!, address: String!): Clinic
    addPatient(firstName: String!, lastName: String!, dateOfBirth: String!, gender: String!, clinicId: Int!): Patient
    addVisit(date: String!, patientId: Int!, clinicId: Int!): Visit
    addMetric(date: String!, value: Float!, type: MetricType!, clinicId: Int, patientId: Int, visitId: Int): Metric
    updateMetric(id: Int!, date: String, value: Float, type: MetricType): Metric
    deleteMetric(id: Int!): Metric
  }
`;
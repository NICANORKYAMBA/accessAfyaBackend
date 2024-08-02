import { enumType } from 'nexus';

export const MetricType = enumType({
  name: 'MetricType',
  members: ['TEMPERATURE', 'BLOOD_PRESSURE', 'HEART_RATE', 'RESPIRATORY_RATE', 'OXYGEN_SATURATION', 'BLOOD_GLUCOSE'],
});

import { objectType } from 'nexus';

export const Clinic = objectType({
  name: 'Clinic',
  definition(t) {
    t.int('id');
    t.string('name');
    t.string('address');
    t.list.field('patients', { type: 'Patient' });
    t.list.field('visits', { type: 'Visit' });
    t.list.field('metrics', { type: 'Metric' });
  },
});
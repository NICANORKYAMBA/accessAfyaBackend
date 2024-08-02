import { objectType } from 'nexus';

export const Visit = objectType({
  name: 'Visit',
  definition(t) {
    t.int('id');
    t.string('date');
    t.field('patient', { type: 'Patient' });
    t.field('clinic', { type: 'Clinic' });
    t.list.field('metrics', { type: 'Metric' });
  },
});

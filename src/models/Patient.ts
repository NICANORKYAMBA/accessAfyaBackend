import { objectType } from 'nexus';

export const Patient = objectType({
  name: 'Patient',
  definition(t) {
    t.int('id');
    t.string('firstName');
    t.string('lastName');
    t.string('dateOfBirth');
    t.string('gender');
    t.field('clinic', { type: 'Clinic' });
    t.list.field('visits', { type: 'Visit' });
    t.list.field('metrics', { type: 'Metric' });
  },
});

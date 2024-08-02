import { objectType } from 'nexus';

export const Metric = objectType({
  name: 'Metric',
  definition(t) {
    t.int('id');
    t.string('date');
    t.float('value');
    t.field('type', { type: 'MetricType' });
  },
});

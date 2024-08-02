import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import cors from 'cors';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';

const app = express();
app.use(cors());

const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
});
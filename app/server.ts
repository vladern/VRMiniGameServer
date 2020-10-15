import { ApolloServer } from "apollo-server-express";
import Express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { connect } from "mongoose";
// resolvers
import {UserResolver} from "./resolvers/Users";
import {CategoriesResolver} from "./resolvers/Categories";

import * as dotenv from "dotenv";
import { GraphQLError } from "graphql/error";
dotenv.config();

const main = async () => {

const schema = await buildSchema({
    resolvers: [CategoriesResolver, UserResolver ],
    emitSchemaFile: true,
    validate: false,
});

const formatError = (error: GraphQLError) => {
    return new GraphQLError(error.message, null, null, null, error.path, error.originalError);
}

// create mongoose connection
const mongoose = await connect(process.env.MONGO_DB_URL as string, {useNewUrlParser: true, useUnifiedTopology: true});
await mongoose.connection;


const server = new ApolloServer({schema, formatError});
const expressServer: Express.Server = Express();
const serverRegistration: any = { // should be ServerRegistration
    app: expressServer,
};
server.applyMiddleware(serverRegistration);
expressServer.listen({ port: process.env.SERVER_PORT }, () =>
  console.log(`Server ready and listening at ==> http://localhost:${process.env.SERVER_PORT}${server.graphqlPath}`));
};
main().catch((error)=>{
    console.log(error, 'error');
});
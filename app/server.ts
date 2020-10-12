import { ApolloServer } from "apollo-server-express";
import Express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { connect } from "mongoose";

// resolvers
import {UserResolver} from "./resolvers/Users";
import {CategoriesResolver} from "./resolvers/Categories";


const main = async () => {
const schema = await buildSchema({
    resolvers: [CategoriesResolver, UserResolver ],
    emitSchemaFile: true,
    validate: false,
});

// create mongoose connection
const mongoose = await connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
await mongoose.connection;


const server = new ApolloServer({schema});
const expressServer: Express.Server = Express();
const serverRegistration: any = { // should be ServerRegistration
    app: expressServer,
};
server.applyMiddleware(serverRegistration);
expressServer.listen({ port: 3333 }, () =>
  console.log(`🚀 Server ready and listening at ==> http://localhost:3333${server.graphqlPath}`));
};
main().catch((error)=>{
    console.log(error, 'error');
})
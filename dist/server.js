"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const mongoose_1 = require("mongoose");
// resolvers
const Users_1 = require("./resolvers/Users");
const Categories_1 = require("./resolvers/Categories");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const schema = yield type_graphql_1.buildSchema({
        resolvers: [Categories_1.CategoriesResolver, Users_1.UserResolver],
        emitSchemaFile: true,
        validate: false,
    });
    // create mongoose connection
    const mongoose = yield mongoose_1.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
    yield mongoose.connection;
    const server = new apollo_server_express_1.ApolloServer({ schema });
    const expressServer = express_1.default();
    const serverRegistration = {
        app: expressServer,
    };
    server.applyMiddleware(serverRegistration);
    expressServer.listen({ port: 3333 }, () => console.log(`🚀 Server ready and listening at ==> http://localhost:3333${server.graphqlPath}`));
});
main().catch((error) => {
    console.log(error, 'error');
});
//# sourceMappingURL=server.js.map
import express from 'express'
import { ApolloServer } from "apollo-server-express";
import { loadFilesSync } from "@graphql-tools/load-files"
import path from "path";
import { contextF } from "./Context.js";
import { teacherResolver, subjectResolver, pupilResolver, authResolver } from "./resolvers/index.js"
import { PORT } from "./config/env.js";

const typesArray = loadFilesSync(path.join(process.cwd(), 'src/types/*.gql'));
const resolversArray = [teacherResolver, subjectResolver, pupilResolver, authResolver];

const init = async () => {
    const server = new ApolloServer({
        typeDefs: typesArray,
        resolvers: resolversArray,
        context: async ({ req }) => contextF({ req }),
    });

    const app = express();
    await server.start()
    server.applyMiddleware({ app });

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

init()

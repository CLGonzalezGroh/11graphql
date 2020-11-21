"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("graphql-tools");
const { readFileSync } = require("fs");
const { join } = require("path");

const isDev = process.env.NODE_ENV !== "production";

const resolvers = require("./lib/resolvers");

const app = express();
const port = process.env.port || 3000;

// schema definition
const typeDefs = readFileSync(
  join(__dirname, "lib", "schema.graphql"),
  "utf-8"
);
const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(cors());

app.use(
  "/api",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: isDev,
  })
);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/api`);
});

// graphql(schema, "{hello}", resolvers).then((data) => {
//   console.log(data);
// });
// graphql(schema, "{greeting}", resolvers).then((data) => {
//   console.log(data);
// });

"use strict";
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { graphql, buildSchema } = require("graphql");
const { readFileSync } = require("fs");
const { join } = require("path");
const resolvers = require("./lib/resolvers");

const app = express();
const port = process.env.port || 3000;

// schema definition
const schema = buildSchema(
  readFileSync(join(__dirname, "lib", "schema.graphql"), "utf-8")
);

app.use(
  "/api",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
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

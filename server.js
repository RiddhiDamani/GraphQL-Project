// Express Logic lives here
const express = require("express");
//glue layer between graphql and express
const expressGraphQL = require("express-graphql").graphqlHTTP;
const schema = require("./schema/schema");

const app = express();

// wire-up middleware to express application
// Registers expressGraphql as the middleware with app
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Listening");
});

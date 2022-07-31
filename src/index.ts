import { createServer } from "@graphql-yoga/node";
import "reflect-metadata";

import { buildSchema } from "type-graphql";

import FooResolver from "./resolvers/FooResolver";

import { MikroORM, Options } from "@mikro-orm/core";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { SqliteDriver } from "@mikro-orm/sqlite";

const run = async () => {
  const orm = await MikroORM.init<SqliteDriver>({
    entities: ["./dist/entities"],
    entitiesTs: ["./src/entities"],
    dbName: "test.sqlite",

    highlighter: new SqlHighlighter(),
    debug: true,
    type: "sqlite",
  });

  const schema = await buildSchema({
    resolvers: [FooResolver],
  });

  const server = createServer({
    schema,
    context: async () => {
      return { em: orm.em.fork() };
    },
  });

  server.start();
};

run();

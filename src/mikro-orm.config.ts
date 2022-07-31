import { SqlHighlighter } from "@mikro-orm/sql-highlighter";

export default {
  entities: ["./dist/entities"],
  entitiesTs: ["./src/entities"],
  dbName: "test.sqlite",

  highlighter: new SqlHighlighter(),
  debug: true,
  type: "sqlite",
};

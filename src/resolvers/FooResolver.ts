import { EntityManager } from "@mikro-orm/core";
import {
  Ctx,
  Field,
  FieldResolver,
  ID,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";

@ObjectType()
class Bar {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;
}

@ObjectType()
class Foo {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  bar: Bar;
}

@Resolver(Foo)
class FooResolver {
  @FieldResolver()
  async bar(@Root() foo: Foo, @Ctx() ctx: any) {
    const em: EntityManager = ctx.em;

    await em.populate(foo, ["bar"]);

    return foo.bar;
  }

  @Query((returns) => [Foo])
  foos(@Ctx() ctx: any) {
    const em: EntityManager = ctx.em;

    return em.find(
      Foo,
      {},
      {
        // populate: ["bar"]
      }
    );
  }
}

export default FooResolver;

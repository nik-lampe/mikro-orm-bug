import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { Bar } from "./Bar";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Foo extends BaseEntity {
  @Property()
  title: string;

  @ManyToOne(() => Bar)
  bar: Bar;
}

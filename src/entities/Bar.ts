import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { Foo } from "./Foo";

@Entity()
export class Bar extends BaseEntity {
  @Property()
  title: string;

  @OneToMany(() => Foo, (b) => b.bar, { cascade: [Cascade.ALL] })
  foos = new Collection<Foo>(this);
}

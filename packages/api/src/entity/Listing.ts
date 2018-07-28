import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  ManyToOne
} from "typeorm";
import { User } from "./User";

// amenities - another table
// amentities - array of strings
// store options as json file?

@Entity("listings")
export class Listing extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column("varchar", { length: 100 })
  name: string;

  @Column("text") pictureUrl: string;

  @Column("varchar", { length: 100 })
  category: string;

  @Column("varchar", { length: 255 })
  description: string;

  @Column("int") price: number;

  @Column("int") beds: number;

  @Column("int") guests: number;

  @Column("int") baths: number;

  @Column("double precision") latitude: number;

  @Column("double precision") longitude: number;

  @Column("text", { array: true })
  amenities: string[];

  //@Column("uuid") ownerId: string;
  @Column("uuid") userId: string;

  @ManyToOne(() => User, user => user.listings)
  //@JoinColumn({ name: "ownerId" })
  user: User;

  @BeforeInsert()
  async hashPassword() {}
}

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { OperationType } from "@modules/accounts/enums/OperationType";

import { User } from "./User";

@Entity("statements")
class Statement {
  @PrimaryColumn()
  readonly id: string;

  @Column("uuid")
  user_id: string;

  @ManyToOne(() => User, (user) => user.statement)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column("uuid")
  sender_id?: string;

  @ManyToOne(() => User, (user) => user.statement)
  @JoinColumn({ name: "sender_id" })
  sender: User;

  @Column()
  description: string;

  @Column("decimal")
  amount: number;

  @Column({ type: "enum", enum: OperationType })
  type: OperationType;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Statement };

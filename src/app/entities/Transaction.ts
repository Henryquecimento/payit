import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("transactions")
class Transaction {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  readonly user_id: string;
  
  @Column()
  amount: string;

  @Column()
  reference: string;

  constructor () {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Transaction }
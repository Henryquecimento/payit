class Statement {
  readonly id: string;

  user_id: string;

  sender_id: string;

  description: string;

  amount: number;

  // type: OperationType; /* Create enums file */

  created_at: Date;

  updated_at: Date;
}

export { Statement };

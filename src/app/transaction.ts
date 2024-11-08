export interface Transaction {
    id: number;
    accountId: number;         // Link to the associated account
    timestamp: Date;     // Date of the transaction
    type: string;   // Type: "Deposit", "Withdrawal", "Transfer", "Fee"
    amount: number;            // Amount of the transaction
  }
  
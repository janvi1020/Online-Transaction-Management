export class Account {
    id: number = 0;
    accountHolderName: string = "";
    balance: number = 0;
    accountType: string = ""; // New field for account type
    email: string = ""; // New field for email
    addressLine1: string = ""; // New field for primary address line
    addressLine2: string = ""; // New field for secondary address line
    pinCode: number = 0; // New field for postal code
    state: string = ""; // New field for state
    country: string = ""; // New field for country
}

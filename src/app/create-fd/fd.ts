export class FD {
    id:number=0;
    accountId: number = 0;
    amount: number = 0;
    depositType: string = ""; 
    email: string = ""; 
    totalPayOut: number = 0; 
    maturityDate: string="" ;
    startDate?: Date ;
    interestRate: number = 0;
    withdrawn?:boolean;
    durationMonths: number=0;
}

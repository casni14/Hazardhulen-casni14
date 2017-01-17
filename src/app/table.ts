export class Table {
   
    deck: number[];
    turnHolder: number;
    activePlayers: {
        id: number;
        socket: string;
        hand: number[];
        bet: number;
        balance: number;
    }[];
    dealerHand: number[];

}
import { Table } from './table'

export const TABLE: Table = {
    deck:   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
            11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
            31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
            41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
            51, 52],
    turnHolder: 0,
    activePlayers: [{"id": 1, "socket": "help", "hand": [3, 7], "bet": 25, "balance": 15000},
                    {"id": 2, "socket": "this", "hand": [25, 48], "bet": 2, "balance": 15000},
                    {"id": 3, "socket": "is gut", "hand": [27, 14], "bet": 75, "balance": 15000}],

    dealerHand: [1, 10, 1, 1]
}
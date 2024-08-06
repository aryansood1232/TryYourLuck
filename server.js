const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
};

const SYMBOLS_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
};

// const deposit = () => {
//     while(true) {
//         const depositAmount = prompt("Enter a deposit: ");
//         const numberDepositAmount = parseFloat(depositAmount);

//         if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
//             console.log("Inalid deposit amount, try again!")
//         } else {
//             return numberDepositAmount;
//         }
//     }
// };

// const getNumberofLines = () => {
//     while(true) {
//         const lines = prompt("Enter the number of lines to bet on (1-3): ");
//         const numberofLines = parseInt(lines);

//         if(isNaN(numberofLines) || numberofLines <=0 || numberofLines > 3) {
//             console.log("Inalid number of lines, try again.")
//         } else {
//             return numberofLines
//         }
//     }
// };

// const getBet = (balance, lines) => {
//     while(true) {
//         const bet = prompt("Enter the total bet: ");
//         const numberBet = parseFloat(bet);

//         if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
//             console.log("Inalid bet, try again.");
//         } else {
//             return numberBet;
//         }
//     }
// };

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for(let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
 
        const reels =[];
        for(let i = 0; i < COLS; i++) {
            reels.push([]);
            const reelSymbols = [...symbols];
            for(let j = 0; j < ROWS; j++) {
                const randomIndex = Math.floor(Math.random() * reelSymbols.length);
                const selectedSymbol = reelSymbols[randomIndex];
                reels[i].push(selectedSymbol);
                reelSymbols.splice(randomIndex, 1);
            }
        }
        return reels;
    };

const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }

    return rows;
};


const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for(let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame ) {
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }

    return winnings;
};

// Handle deposit and initialize balance
app.post('/deposit', (req, res) => {
    const { depositAmount } = req.body;
    if (isNaN(depositAmount) || depositAmount <= 0) {
        return res.status(400).json({ error: 'Invalid deposit amount' });
    }
    res.json({ balance: depositAmount });
});

app.post('/spin', (req, res) => {
    const { bet, lines, balance } = req.body;

    if (bet * lines > balance) {
        return res.status(400).json({ error: 'Insufficient balance' });
    }

    const reels = spin();
    const rows = transpose(reels);
    const winnings = getWinnings(rows, bet, lines);
    const newBalance = Math.max(0, balance - (bet * lines) + winnings);

    res.json({
        rows,
        winnings,
        newBalance,
    });
});


app.listen(port, () => {
    console.log(`Slot machine app listening at http://localhost:${port}`);
});

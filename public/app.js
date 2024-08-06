document.getElementById('deposit-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const depositAmount = document.getElementById('depositAmount').value;

    const response = await fetch('http://localhost:3000/deposit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ depositAmount: parseFloat(depositAmount) }),
    });

    const data = await response.json();
    document.getElementById('balance').textContent = `Balance: $${data.balance}`;
});

document.getElementById('spin-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const bet = parseFloat(document.getElementById('bet').value);
    const lines = parseInt(document.getElementById('lines').value);
    const balanceText = document.getElementById('balance').textContent;
    const balance = parseFloat(balanceText.replace('Balance: $', ''));

    if (bet * lines > balance) {
        alert('Insufficient balance to place the bet.');
        return;
    }

    const response = await fetch('http://localhost:3000/spin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bet, lines, balance }),
    });

    const data = await response.json();
    document.getElementById('balance').textContent = `Balance: $${data.newBalance}`;

    const reelsContainer = document.querySelector('.reels');
    reelsContainer.innerHTML = '';

    data.rows.forEach(row => {
        const reelDiv = document.createElement('div');
        reelDiv.className = 'reel';
        row.forEach(symbol => {
            const symbolDiv = document.createElement('div');
            symbolDiv.textContent = symbol;
            reelDiv.appendChild(symbolDiv);
        });
        reelsContainer.appendChild(reelDiv);
    });

    let resultText = `Winnings: $${data.winnings}`;
    document.getElementById('results').textContent = resultText;
});

const socket = new WebSocket("wss://your-replit-server-url");

socket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    handleMove(data.row, data.col, data.symbol);
});

function handleMove(row, col, symbol) {
    const cell = document.getElementById(`cell-${row}-${col}`);
    cell.textContent = symbol;
    cell.disabled = true;
}

function handleClick(row, col) {
    if (!document.getElementById(`cell-${row}-${col}`).disabled) {
        const symbol = prompt("Enter X or O:");
        if (symbol === "X" || symbol === "O") {
            socket.send(JSON.stringify({ row, col, symbol }));
        } else {
            alert("Invalid symbol. Please enter X or O.");
        }
    } else {
        alert("This cell is already taken. Choose another one.");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cell = document.createElement("button");
            cell.id = `cell-${row}-${col}`;
            cell.className = "cell";
            cell.addEventListener("click", () => handleClick(row, col));
            board.appendChild(cell);
        }
    }
});

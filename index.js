const express = require('express');
const path = require('path');
const readline = require('readline')

const app = express();
let server;
let port;

function startServer() {
    app.use(express.static(process.cwd()));

    app.get('/', (res) => {
        res.sendFile(path.join(process.cwd(), 'index.html'));
    });

    server = app.listen(port, () => {
        console.log('\x1b[32m', `Server is running on http://localhost:${port}`);
        console.log('\x1b[0m', 'press "r + enter" to restart');
    });
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a port number (default is 1420): ', (input) => {
    port = input.trim() !== '' ? parseInt(input) : 1420;
    console.log('\x1b[2J');
    startServer();
});

rl.on('line', (input) => {
    if (input.trim().toLowerCase() !== 'r') return;
    console.log('Restarting server...');
    server.close(() => {
        startServer();
    });
});

rl.on('SIGINT', () => {
    rl.close();
    process.exit();
});

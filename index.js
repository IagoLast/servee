#!/usr/bin/env node

const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const os = require('os');

// This line is from the Node.js HTTPS documentation.
const options = {
    key: fs.readFileSync(path.join(__dirname, './keys/server.key')),
    cert: fs.readFileSync(path.join(__dirname, './keys/server.crt'))
};

// Create a service (the app object is just a callback).
const app = express();

// Enable CORS
app.use(cors());

// Serve current working directory
app.use(express.static(process.cwd()));


// Create an HTTPS service on port 5000
https.createServer(options, app).listen(5000);

const networkAddress = `\t https://${_getNetworkAddress()}:${5000}`;
console.log(`Serving ${process.cwd()} on: \n`);
console.log(`\t https://localhost:5000`);
console.log(networkAddress);


function _getNetworkAddress() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const interface of interfaces[name]) {
            const { address, family, internal } = interface;
            if (family === 'IPv4' && !internal) {
                return address;
            }
        }
    }
};
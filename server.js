const express = require('express');
const wifi = require('node-wifi');

const app = express();
const port = 3000;

wifi.init({ iface: null });

app.get('/scan-wifi', (req, res) => {
    wifi.scan((error, networks) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.json(networks);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

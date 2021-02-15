const express = require('express');
const app = express();
const port = 8080;

const fs = require('fs');

let tasks;
fs.readFile('./tasks.json', (err, data) => {
    if (err) throw err;
    tasks = JSON.parse(data);
});

app.get('/api/tasks', (req, res) => {
    res.send(tasks);
});

app.listen(port, () => {
    console.log('server listening on port ' + port);
});
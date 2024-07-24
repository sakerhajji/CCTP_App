const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello from the Node.js server!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

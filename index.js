const express = require('express');
const app = express();

const port = process.env.PORT || 3700;

// base end point
app.get('/', (req, res) => {
    res.send('Welcome to the conference talk API');
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
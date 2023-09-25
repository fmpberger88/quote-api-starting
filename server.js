const express = require('express');
const app = express();

app.use(express.json());

const quoteRouter = require("./quotes");
const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
app.use('/api/quotes', quoteRouter);


app.listen(PORT, () => {
    console.log(`Server listing on Port:${PORT}`);
})


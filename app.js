const express = require('express');
const dotEnv = require('dotenv');

const connectDB = require('./config/db');
const {errorHandler} = require('./middlewares/errors');

dotEnv.config({path: "./config/config.env"});

connectDB();

const app = express();

// Body Parser
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// Routes
app.use("/users", require('./routes/user'));

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
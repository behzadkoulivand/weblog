const express = require('express');
const dotEnv = require('dotenv');
const fileUpload = require('express-fileupload');

const connectDB = require('./config/db');
const {errorHandler} = require('./middlewares/errors');
const { setHeaders } = require('./middlewares/setHeaders');

dotEnv.config({path: "./config/config.env"});

connectDB();

const app = express();

// Body Parser
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(setHeaders);

//* File Upload Middleware
app.use(fileUpload());

// Routes
app.use("/users", require('./routes/user'));
app.use("/dashboard", require('./routes/dashboard'));

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
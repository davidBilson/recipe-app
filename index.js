const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
require('dotenv').config(); // Load environment variables from .env file
const UserRouter = require('./routes/users.js')

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", UserRouter); // Use "/auth" as the base URL for UserRouter

const MongoURL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3005

mongoose.connect(MongoURL)
.then(() => {
    app.listen(PORT, () => console.log(`Connected to DB and server started on port ${PORT}`))
})
.catch(err => console.log(err));
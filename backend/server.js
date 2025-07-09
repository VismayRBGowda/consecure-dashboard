const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDb connected successfully"))
    .catch((err) => console.error("MongoDB error : ", err));

const threatRoutes = require("./routes/threats");
app.use('/api/threats', threatRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
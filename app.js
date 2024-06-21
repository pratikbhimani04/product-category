require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const dbConnect = require('./src/database/dbConnect');
const router = require("./src/routes");
dbConnect()

app.use(express.json());

app.use('/api', router)

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});

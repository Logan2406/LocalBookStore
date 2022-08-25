const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
const cors = require('cors')
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

const bookRoute = require("./routes/bookRoute")
const authorRoute = require("./routes/authorRoute")
const adminRoute = require("./routes/adminRoute")
const userRoute = require("./routes/userRoute")


const {verifyUser,login,logout} = require("./functions/authFunctions")

app.use(cors());

app.use("/books",verifyUser,bookRoute)
app.use("/author",verifyUser,authorRoute)
app.use("/admin",adminRoute)
app.use("/user",verifyUser,userRoute)

app.post("/login",login)
app.get("/logout",logout)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
const express = require('express');
const app = express();


const router = express.Router();

const {getAllBooks,getBooksByGenre,getBookInfo} = require("../functions/bookFunctions")
const {login} = require("../functions/authFunctions")


router.get("/allbooks",getAllBooks)
router.get("/getinfo/:id",getBookInfo)
router.get("/:genre/:language",getBooksByGenre)

//router.post("/login",login)



module.exports = router;






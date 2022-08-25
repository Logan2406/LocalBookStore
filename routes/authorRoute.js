const express = require('express');
const app = express();


const router = express.Router();

const {getAuthorInfo,getAllAuthors} = require("../functions/authorFunctions")

router.get("/getallauthor",getAllAuthors);
router.get("/authorInfo/:id",getAuthorInfo);




module.exports = router;

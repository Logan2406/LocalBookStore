const express= require('express')
const router = express.Router()


const {getAllBooks,getBookInfo,getAllGenres,getAllLanguages,issueBook,getAllReviews,getReviewsForBook,getSearchBooks} =require("../functions/bookFunctions");
const { getAllAuthors,getAuthorInfo} = require("../functions/authorFunctions");
const {addUser,sendMessage,getAllUSers,verifyUser,returnBook,getIssueBookHistory,getAllIssues} = require("../functions/userFunctions");

router.get("/getBooks",getAllBooks);
router.get("/getBookDetails/:id",getBookInfo);


router.get("/getAuthors",getAllAuthors); 
router.get("/getAuthorDetails/:id",getAuthorInfo);

router.get("/getGenres",getAllGenres)
router.get("/getLanguages",getAllLanguages)

router.post("/adduser",addUser)
router.get("/sendmessage",sendMessage)
router.get("/getUsers",getAllUSers)
router.post("/verifyUser",verifyUser)

router.post("/issuebook",issueBook)
router.post("/returnbook",returnBook)
router.get("/issuehis",getIssueBookHistory)
router.get("/allissues",getAllIssues)

router.get("/getallreviews",getAllReviews)
router.get("/getbookreviews/:id",getReviewsForBook)

router.get("/getsearch",getSearchBooks);

module.exports = router
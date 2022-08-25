const express = require('express');
const { format } = require('util');
const app = express();


const router = express.Router();

const {getUserData,getReadBooksData,getCurrentReading,addWishList,getWishList,getMyAllWishList,getMyReadBooks,getReviewAdded,addReview,getMyAllReviews,editReview,deleteReview} = require("../functions/userFunctions")
const {getReviewsForBook,getSearchBooks} =require("../functions/bookFunctions");


router.get("/userdata",getUserData)
router.get("/booksdata",getReadBooksData)
router.get("/currentread",getCurrentReading)
router.get("/addwishlist/:id",addWishList)
router.get("/getwishlist/:id",getWishList)
router.get("/getmywishlist",getMyAllWishList)

router.get("/myallbooks",getMyReadBooks)
router.get("/isreview/:id",getReviewAdded)
router.post("/addreview/:id",addReview) 
router.get("/allreviews",getMyAllReviews)
router.post("/editreview/:id",editReview)
router.get("/deletereview/:id",deleteReview)

router.get("/bookreview/:id",getReviewsForBook)

router.post("/getsearch",getSearchBooks);

module.exports = router
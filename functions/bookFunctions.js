const util=require('util');
const mysql = require('../Utils/db')
const query = util.promisify(mysql.query).bind(mysql);


module.exports={
    getAllBooks:async function(req,res)
    {
        console.log("I am in all books");
        let sql = "Select book.book_id,book.name as book_name,author.name as auth_name,img_path,copies,genre.name as gen_name,language.name as lan_name from book,author,genre,language where book.auth_id=author.auth_id and book.gen_id=genre.gen_id and book.lan_id=language.lan_id;";
        let rows =await query(sql);
        res.status(200).send({books:rows})
    },
    getBooksByGenre:async function(req,res)
    {
        const {genre,language} = req.params;
        console.log("I am in books by genre");
        let sql = `SELECT book.book_id,book.name as book_name,price,copies,img_path,author.name as auth_name FROM (((book inner join language on book.lan_id=language.lan_id) inner join genre on book.gen_id=genre.gen_id)inner join author on book.auth_id=author.auth_id) where language.name='${language}' and genre.name='${genre}'`
        let rows = await query(sql);
        res.status(200).send({books:rows})
    },
    getBookInfo:async function(req,res)
    {
        const {id} = req.params;
        console.log("I am in book info");
        let sql = `SELECT book.book_id,book.name as book_name,img_path,author.auth_id as auth_id,author.name as auth_name,price,copies,copies_left from book,author where book_id=${id} and author.auth_id=book.auth_id`;
        let rows = await query(sql);
        console.log(rows[0]);
        res.status(200).send({book:rows[0]});
    },
    getAllGenres :async function(req,res)
    {
        let sql = `SELECT * from genre`;
        let rows = await query(sql);

        res.status(200).send({genres:rows});
    },

    getAllLanguages: async function(req,res)
    {
        let sql = `SELECT * from language`;
        let rows = await query(sql);
        res.status(200).send({languages:rows});
    },
    issueBook :async function (req,res)
    {
        let bookId = req.body.bookid;
        let username = req.body.username;

        let sql = `SELECT user_id from user where username='${username}'`;
        let rows = await query(sql)

        let date = new Date().toISOString().split('T')[0]

        sql = `Insert into issue(user_id,book_id,issue_date) values(${rows[0]['user_id']},${bookId},'${date}')`
        let resp = await query(sql);

        sql = `Update book set copies_left=copies_left-1 where book_id=${bookId}`;
        resp = await query(sql);

        return res.status(200).send({msg:"Updated Successfully"})
    },

    getAllReviews:async function(req,res)
    {
        console.log("I am in all reviews")
        let sql = `Select rev_id,book.name as book_name,img_path,author.name as auth_name,user_desc.name as user_name,user.username as username,review.review,review.rating from review,user,user_desc,book,author where review.user_id=user.user_id and user.user_desc_id=user_desc.user_desc_id and review.book_id=book.book_id and book.auth_id=author.auth_id`;
        let rows = await query(sql);
        return res.status(200).send({reviews:rows})
    
    },

    getReviewsForBook:async function(req,res)
    {
        let bookId = req.params.id
        console.log("I am in reviews for book" + bookId)

        let sql = `Select user_desc.name as user_name, review.review, review.rating from review,user,user_desc where review.book_id=${bookId} and review.user_id=user.user_id and user.user_desc_id=user_desc.user_desc_id`
        let rows = await query(sql);
        

        sql = `Select AVG(rating) as avg, Count(rating) as count from review where review.book_id=${bookId}`;
        let avg_rows = await query(sql);
        let avg = avg_rows[0].avg;
        let count_rat = avg_rows[0].count;

        sql = `Select name as book_name from book where book_id=${bookId}`;
        let books = await query(sql);
        let book_name = books[0].book_name

        return res.status(200).send({reviews:rows,average:avg,bookname:book_name})
    },

    getSearchBooks:async function(req,res)
    {
        console.log("In search books")

       // genres =["'Mythology'","'Romantic'"]


        //console.log("Search Value"+req.body.search)
        //console.log("Languages"+JSON.stringify(req.body.languages))
        //console.log("Gneres"+JSON.stringify(req.body.genres))

        const reqLang = req.body.languages
        const gen = req.body.genres

        const languages = [];
        const genres =[];

        if(reqLang.english)
        {
            languages.push("'English'")
        }
        if(reqLang.bengali)
        {
            languages.push("'Bengali'")
        }



        if(gen.horror)
        {
            genres.push("'Horror'")
        }
        if(gen.kids)
        {
            genres.push("'Kids'")
        }
        if(gen.fantasy)
        {
            genres.push("'Fantasy'")
        }
        if(gen.romantic)
        {
            genres.push("'Romantic'")
        }
        if(gen.mythology)
        {
            genres.push("'Mythology'")
        }
        if(gen.thriller)
        {
            genres.push("'Thriller'")
        }

        console.log(genres)
        console.log(languages)
       
       
         // console.log(genres)


        let sql = `Select book_id as id,book.name as book_name,img_path,author.name as auth_name,copies_left from book,genre,language,author where book.gen_id=genre.gen_id and language.lan_id=book.lan_id and author.auth_id = book.auth_id and genre.name in (${[...genres]}) and language.name in (${[...languages]})`;
        let rows = await query(sql)
        console.log(rows)

        
        return res.status(200).send({books:rows})
        //return res.status(200).send({books:rows});





    }

}
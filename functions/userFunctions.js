const bcrypt = require("bcrypt")
const util=require('util');
const mysql = require('../Utils/db')
const query = util.promisify(mysql.query).bind(mysql);

//const fast2sms = require('fast-two-sms')
var fast2sms = require('fast2sms');

module.exports={

    sendMessage:async function(req,res)
    {
        /*console.log(process.env.SMS_API_KEY)
        let options = {authorization : process.env.SMS_API_KEY , message : "This is a demo message",  numbers : ['8372980164']}
        const resp = await fast2sms.sendMessage(options)
        console.log(resp)*/

        var options = {API_KEY:process.env.SMS_API_KEY};
        fast2sms.init(options)

        fast2sms.send({ message: 'The SMS content e.g. "This is a message from Fast2SMS"', to: '8372980164' }).then(function (data) {
            console.log('data................', data);
        }).catch(function (error) {
            console.log('err.................', error);
        })

        return res.send({msg:'Hello'})

    },

    getUserData:async function(req,res)
    {
        let username = req.username;
        console.log(username)

        let sql = `Select name,address,dob,aadhar,pri_mob,sec_mob from user,user_desc where user.username='${username}' and user.user_desc_id=user_desc.user_desc_id`

        let rows = await query(sql);
        let row = rows[0];

        return res.status(200).send({user:row})
        
    },
    
    getReadBooksData :async function(req,res)
    {
        let username = req.username;

        let sql = `Select book.name as book_name,issue_date,return_date,penalty from issue_his,user,book where user.username='${username}' and issue_his.user_id=user.user_id and issue_his.book_id=book.book_id`;
        let rows = await query(sql);
        
        rows = rows.map((ele,index)=>{return({book_name:ele.book_name,issue_date:new Date(ele.issue_date).toISOString().split("T")[0],return_date:new Date(ele.return_date).toISOString().split("T")[0],penalty:ele.penalty})})
        
        let newRows = rows.map((ele,index)=>Object.values(ele))
        
        console.log(newRows)

        return res.status(200).send({issues:newRows})
    }
    ,
    getCurrentReading :async function(req,res)
    {
        let username = req.username;

        let sql = `Select book.name as book_name, issue.issue_date, author.name as auth_name from user,issue,book,author where user.username='${username}'and user.user_id=issue.user_id and issue.book_id=book.book_id and book.auth_id = author.auth_id`;
        let rows = await query(sql);
        
        if(rows.length>0)
        {
            let row = rows[0]
            return res.status(200).send({book:row})
        }
        else
        {
            return res.status(200).send({book:"NO"})
        }
        
       
    }
    ,
    addUser :async function(req,res)
    {
        console.log("I amn in add user");
        let username = req.body.username;
        let name = req.body.name;
        let address = req.body.address;
        let priphone = req.body.priphone;
        let secphone = req.body.secphone;
        let dob = req.body.dob;

        //let password = Math.round(new Date()/1000000).toString();
        let password = username.toString()
        
        const salt = await bcrypt.genSalt();
        const passw = await bcrypt.hash(password,salt);
        
        let sql =""
        try
        {
            sql = `INSERT INTO user_desc(name,address,dob,aadhar,pri_mob,sec_mob) values('${name}','${address}','${dob}','${username}','${priphone}','${secphone}')`;
            const rep = await query(sql);
        }
        catch(err)
        {
            console.log(err)
        }
        
        try
        {   
            sql = `SELECT user_desc_id from user_desc where aadhar='${username}'`;
            let row = await query(sql);
            let ud = row[0]['user_desc_id'];
            sql = `INSERT INTO user(username,password,user_desc_id,islogged) values('${username}','${passw}',${ud},0)`;
            const rr = await query(sql);
        }
        catch(err)
        {
            console.log(err)
        }

        return res.status(200).send({msg:'User Added'});
        

    },
    getAllUSers:async function(req,res)
    {
        console.log("I am in all users")
        let sql = `Select * from user,user_desc where user.user_desc_id=user_desc.user_desc_id`
        let rows = await query(sql);
        return res.status(200).send({users:rows});
    }
    ,
    verifyUser : async function (req,res)
    {
        console.log("Verify user");
        
        let username = req.body.username;
        let sql = `SELECT user_id from user where username='${username}'`;

        console.log(username);
        let rows = await query(sql);
        if(rows.length<1)
        {
            return res.status(200).send({msg:"NO_USER"});
        }
        else
        {
            let user_id = rows[0].user_id;
            sql = `SELECT * from issue where user_id='${user_id}'`;
            
            rows = await query(sql);

            if(rows.length>0)
            {
                return res.status(200).send({msg:"ALREADY_ISSUED"})
            }

            else
            {
                return res.status(200).send({msg:"VERIFIED"})
            }
            
        }
    },
    getIssueBookHistory:async function(req,res)
    {
        let sql = `Select issue_id,user.username as username, user_desc.name as user_name, book.name as book_name,book.img_path as img_path,issue_date,return_date,penalty from issue_his,user,user_desc,book where issue_his.user_id=user.user_id and book.book_id=issue_his.book_id and user.user_desc_id=user_desc.user_desc_id`;
        let rows = await query(sql);
        return res.status(200).send({issues:rows})
    },

    returnBook:async function(req,res)
    {
        console.log("i am in return book")
        let issue_id = req.body.issue_id;
        let penalty = req.body.penalty;
        let sql = `SELECT * from issue where issue_id=${issue_id}`;
        let rows = await query(sql);
        let row = rows[0];


        let date= new Date().toISOString().split('T')[0]
        console.log(date)
        let issue_date = new Date(row.issue_date).toISOString().split('T')[0]
        console.log(issue_date)
        
        sql = `INSERT into issue_his(user_id,book_id,issue_date,return_date,penalty) values(${row.user_id},${row.book_id},'${issue_date}','${date}',${penalty})`;
        let resp = await query(sql);
        console.log(resp)

        sql = `DELETE from issue where issue_id=${issue_id}`;
        resp = await query(sql);

        sql = `Update book set copies_left=copies_left+1 where book_id=${row.book_id}`;
        resp = await query(sql)
        return res.status(200).send({msg:"Updated Successfully"})

    },

    getAllIssues:async function(req,res)
    {
        console.log("I am in issues")
        let sql = `SELECT issue_id,user.username as username,book.img_path as img_path,user_desc.name as user_name,book.name as book_name,issue_date from issue,user,user_desc,book where issue.user_id=user.user_id and issue.book_id=book.book_id and user.user_desc_id=user_desc.user_desc_id`;
        let rows = await query(sql);
        return res.status(200).send({issues:rows});
    
    },
    addWishList :async function(req,res)
    {
        let username = req.username;
        let bookId = req.params.id;

        let sql = `SELECT user_id from user where username='${username}'`;
        let rows = await query(sql);
        let row = rows[0];

        sql = `Insert into wishlist(user_id,book_id) values (${row.user_id},${bookId})`
        let resp = await query(sql);


    },
    getWishList :async function(req,res)
    {
        console.log("I am in wishlist")
        let username = req.username;
        let bookId = req.params.id;

        let sql = `SELECT user_id from user where username='${username}'`;
        let rows = await query(sql);
        let row = rows[0];

        sql = `Select * from wishlist where user_id=${row.user_id} and book_id=${bookId}`;
        rows = await query(sql);
        
        if(rows.length<1)
        {
            return res.status(200).send({msg:"NOT_AV"})
        }
        else
        {
            return res.status(200).send({msg:"AV"})
        }

    },
    getMyAllWishList : async function(req,res)
    {
        console.log("I am in wishlist")
        let username = req.username;

        let sql = `Select wishlist.wish_id as id, book.name as book_name, author.name as auth_name, img_path, copies_left from wishlist,book,author,user where user.username='${username}' and wishlist.user_id=user.user_id and wishlist.book_id=book.book_id and author.auth_id = book.auth_id`;

        let rows = await query(sql);

        return res.status(200).send({books:rows})
    },
    deleteMyWish : async function(req,res)
    {
        let wish_id = req.params.id;
        let sql = `Delete from wishlist where wish_id = ${wish_id}`;
        let resp = await query(sql);

        return res.status(200).send({msg:"wish deleted"})


    },


    getMyAllReviews :async function(req,res)
    {
        let username = req.username;
        let sql = `Select user_id from user where username='${username}'`;
        let rows = await query(sql);
        let user_id = rows[0].user_id;

        sql = `Select review.rev_id as id, img_path,book.name as book_name, author.name as auth_name,review.review, review.rating from review,book,author where review.user_id=${user_id} and review.book_id=book.book_id and author.auth_id=book.auth_id`
        rows = await query(sql);
        return res.status(200).send({books:rows});

    },
    addReview:async function(req,res)
    {
        let username = req.username;
        let bookId = req.params.id;
        let rating=req.body.rating;
        let review=req.body.review;

        let sql = `Select user_id from user where username='${username}'`;
        let rows = await query(sql);
        let row = rows[0];

        sql = `INSERT into review(user_id,book_id,rating,review) values(${row.user_id},${bookId},${rating},'${review}')`;
        let resp = await query(sql); 
        
        return res.status(200).send({msg:"Reaview added"})

    }
    ,
    editReview :async function(req,res)
    {
        let username = req.username;
        let revId = req.params.id; 

        console.log("I am in edit review")

        console.log("rev Id :"+revId)

        let rating=req.body.rating;
        let review=req.body.review;

        let sql = `Update review set rating=${rating},review='${review}' where rev_id=${revId}`;
        let resp = await query(sql); 
        return res.status(200).send({msg:"Review edited"})



    },
    deleteReview :async function(req,res)
    {

        let username = req.username;
        let revId = req.params.id; 

        let sql = `DELETE from review where rev_id=${revId}`;

        return res.status(200).send({msg:"Review delted"})
    },
    getMyReadBooks :async function(req,res)
    {
        console.log("I am in get my read books\n\n");

        let username = req.username;
        let sql = `Select book.book_id as id, book.name as book_name,issue_date,return_date,penalty from issue_his,user,book,author where user.username='${username}' and issue_his.user_id=user.user_id and issue_his.book_id=book.book_id and author.auth_id=book.auth_id`;
        let rows = await query(sql);
        return res.status(200).send({books:rows});
    },

    getReviewAdded :async function(req,res)
    {
        let username = req.username;
        let bookId = req.params.id;
        let sql = `select user_id from user where username='${username}'`;
        let rows = await query(sql);
        let user_id = rows[0].user_id;

        sql = `select * from review where user_id=${user_id} and book_id=${bookId}`
        rows = await query(sql);

        if(rows.length<1)
        {
            return res.status(200).send({msg:"NO_REV"})
        }
        else
        {
            return res.status(200).send({msg:"REV"})
        }


    }


}
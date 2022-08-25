const bcrypt = require("bcrypt")
const util=require('util');
const mysql = require('../Utils/db')
const query = util.promisify(mysql.query).bind(mysql);
const jwt = require('jsonwebtoken');

const createToken =async(usname)=>
{   
    return jwt.sign({username:usname},process.env.JWT_TOK_SECRET)
}



module.exports={
    login:async function(req,res)
    {
        console.log("I am in login")
        let username = req.body.username;
        let password = req.body.password;
        console.log("username :"+username+" password:"+password)

        let sql = `SELECT * from user where username='${username}'`;
        let rows = await query(sql);

        if(rows==null||rows.length==0)
        {
            return res.status(400).send({msg:'No User Found'})
        }
        else
        {
            let user = rows[0]
            const auth = await bcrypt.compare(password,user.password)

            if(auth)
            {
                let token = await createToken(username)
                sql = `UPDATE user set acc_token='${token}' where username='${username}'`;
                await query(sql);
                sql = `Select name from user_desc where user_desc_id=${user['user_desc_id']}`;
                let row = await query(sql);
                
                return res.status(200).send({name:row[0].name,id:username,accTok:token})
            }
            else
            {
                return res.status(400).send({msg:'Password Not matched'})
            }
        }

    }
    ,
    logout:async function(req,res)
    {
        let token = req.headers.token
        let username = ""

        jwt.verify(token,process.env.JWT_TOK_SECRET,(err,response)=>
        {
            if(err)
            {
                //error part
                return res.status(400).send({msg:"Error Occured"})
            }
            else
            {
                username =response.username
            }
        })
        
        let sql = `UPDATE user set acc_token=NULL where username='${username}'`;

        return res.status(200).send({msg:'Logout successful'})

    },
    verifyUser:async function(req,res,next)
    {
        console.log("I am in verify user");
        let token = req.headers.token;
        console.log("token :"+token);
       
        
        jwt.verify(token,process.env.JWT_TOK_SECRET,(err,response)=>
        {
            if(err)
            {
                //error part
                return res.status(400).send({msg:"Error Occured"})
            }
            else
            {
                username =response.username;
            }
        })
        req.username = username;
        next();


    },
    verifyAdmin:async function(req,res,next)
    {
        let username = req.headers.username;
        let password = req.headers.password;
    }
}
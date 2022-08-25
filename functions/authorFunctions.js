const util=require('util');
const mysql = require('../Utils/db')
const query = util.promisify(mysql.query).bind(mysql);

module.exports={
    getAuthorInfo:async function(req,res)
    {
            const {id} = req.params;
            let sql = `select book_id,book.name as book_name,img_path from book,author where book.auth_id=author.auth_id and author.auth_id=${id}`;
            let rows = await query(sql);
            sql = `select * from author where auth_id= ${id}`;
            let row = await query(sql);

            res.status(200).send({author:row[0],details:rows})
    },
    getAllAuthors : async function(req,res)
    {
        console.log("In all authors")
        let sql = `select * from author order by name`;
        let rows = await query(sql);

        sql = `select distinct(country) from author`;
        let  countries= await query(sql); 

        console.log(countries)
        res.status(200).send({authors:rows,countries:countries})
    }
}
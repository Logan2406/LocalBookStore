import { useState,useEffect } from "react"
import axios from "axios"

const Reviews = () =>
{
    const [reviews,setReviews] = useState([])
    const getData =async() =>
    {
       let response = await axios.get("http://localhost:5000/admin/getallreviews",
        {headers:{'Content-Type': 'application/json'}}).then(data=>data.data.reviews).catch(err=>err)

        setReviews(response)

    }
    console.log("I am in all reviews")

    useEffect(()=>
    {
        
        getData()
    },[])

    return(
        <div style={{paddingTop:"30px"}}>
           
            <table class="table table-dark" style={{boxShadow:'5px 10px 5px 20px #203A43'}}>
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Book Name</th>
                <th scope="col">Author</th>
                <th scope="col">User_id</th>
                <th scope="col">Name</th>
                <th scope="col">Review</th>
                <th scope="col">Rating</th>
                </tr>
            </thead>
            <tbody>
            {reviews.map((ele,index)=>
            {
                return(<tr>
                    <th scope="row">{index+1}</th>
                    <td><img style={{height:'80px',width:'50px'}} src={ele.img_path}/></td>
                    <td>{ele.book_name}</td>
                    <td>{ele.auth_name}</td>
                    <td>{ele.username}</td>
                    <td>{ele.user_name}</td>
                    <td>{ele.review}</td>
                    <td>{ele.rating}</td>
                </tr>)
            })}
            </tbody>
            </table>
        </div>
    )
}

export default Reviews
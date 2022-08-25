import axios from "axios";
import {useParams} from 'react-router-dom'
import {useEffect,useState} from 'react'

const ReviewsForBook = () =>
{
    const {id} = useParams();

    const [reviews,setReviews] = useState([]);
    const [bookName,setBookName] = useState(" ")
    const [avg,setAvg] = useState(" ");

    const getData =async() =>
    {
       let response = await axios.get(`http://localhost:5000/admin/getbookreviews/${id}`,
        {headers:{'Content-Type': 'application/json'}}).then(data=>data.data).catch(err=>err)
    
    

        setReviews(response.reviews)
        setBookName(response.bookname)
        setAvg(response.average);

    }


    useEffect(()=>
    {
        getData()

    },[])

    return(
        <div style={{paddingTop:"30px",padding:"30px"}}>
           <h1 style={{textAlign:'center'}}>{bookName}</h1>
           <h3 style={{textAlign:'center'}}>Average Rating --{avg}</h3>
            <table class="table table-dark" style={{}}>
            <thead>
                <tr>
                <th scope="col">#</th>
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

export default ReviewsForBook;
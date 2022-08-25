import axios from "axios";
import {useParams} from 'react-router-dom'
import {useEffect,useState} from 'react'


const AboutAuthor = () =>
{
    const params = useParams();

    const [author,setAuthor] = useState({})
    const [books,setBooks] = useState([])

    const getData = async() =>
    {
        const response = await axios.get("http://localhost:5000/admin/getAuthorDetails/"+params.id).then(data=>data.data).catch(err=>err);
        setAuthor(response.author);
        setBooks(response.details);
    }

    useEffect(()=>{
            getData()
    },[])

    return(
        <div style={{display:'flex',backgroundColor:'green',borderRadius:'20px',padding:'20px',flexDirection:'column',justifyContent:'center',alignItems:'center',margin:'50px'}}>
        <div style={{display:'flex',flexDirection:'row',columnGap:'30px',justifyContent:'space-between'}}>
            <div style={{flex:1}}>
                <img style={{height:'200px',width:'200px'}} src={"/writer.png"}/>
            </div>
            <div style={{flex:3,alignSelf:'center'}}>
                <h5>Name : {author.name}</h5>
                <hr style={{marginLeft:0,textAlign:'left',width:'90%'}}/>
                <h5>Country : {author.country}</h5>
                <hr style={{marginLeft:0,textAlign:'left',width:'90%'}}/>
            </div>
        </div>
            <table class="table table-striped table-dark">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Image</th>
                    <th scope="col">Book Name</th>
                    <th scope="col">Language</th>
                    <th scope="col">Genre</th>
                    </tr>
                </thead>
                <tbody>
                {books.map((ele,index)=>{
                    return(
                        <tr>
                            <th scope="row">{index}</th>
                            <td><img style={{height:'80px',width:'50px'}} src={ele.img_path}/></td>
                            <td>{ele.book_name}</td>
                            <td>{ele.img_path===undefined?' ':ele.img_path.split("/")[2]}</td>
                            <td>{ele.img_path===undefined?' ':ele.img_path.split("/")[3]}</td>
                        </tr>
                    )
                })}
                    
                </tbody>
            </table>
        </div>
    )
}

export default AboutAuthor;
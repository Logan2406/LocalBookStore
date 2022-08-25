import axios from "axios";
import {useState,useEffect} from 'react'
import "./addbook.css"

const AddBook =()=>
{

    const [genres,setGenres] = useState([]);
    const [languages,setLanguages] = useState([]);
    const [authors,setAuthors] = useState([]);
    const [searchBool,setSearchBook] = useState(false);

    const [author,setAuthor] = useState("");


    const handleAuthor = (e) =>
    {   setSearchBook(true);
        setAuthor(e.target.value);
    }


    const getGenres = async() =>
    {
       let response =  await axios.get("http://localhost:5000/admin/getGenres").then(data=>data.data.genres).catch(err=>err);
       setGenres(response);
    } 
    
    const getLanguages = async() =>
    {
       let response =  await axios.get("http://localhost:5000/admin/getLanguages").then(data=>data.data.languages).catch(err=>err);
       setLanguages(response);
    } 

    const getAuthors = async() =>
    {
       let response =  await axios.get("http://localhost:5000/admin/getAuthors").then(data=>data.data.authors).catch(err=>err);
       setAuthors(response)
    } 
    useEffect(()=>{
        getGenres();
        getLanguages();
        getAuthors();

    },[])




    return(
        <div style={{margin:"60px"}}>
        <form>
            <div className="form-group">
                <div className="row">
                    <div className="col-md-6">
                        <label style={{color:'white'}} htmlFor="username">Enter Book</label>
                        <input type="text" className="form-control" id="username" name="username"  placeholder="Enter Aadhar Number"/>
                    </div>
                    <div className="col-md-4">
                        <label style={{color:'white'}} htmlFor="name">Choose Author Name</label>
                        <input type="text" className="form-control" value={author} onChange={handleAuthor} id="name" name="name" placeholder="Enter Your Full Name"/>
                        <div className="dropdown" style={{position:'relative',backgroundColor:'white',borderRadius:'20px',height:'100px',padding:'10px',overflowY:'scroll'}}>
                        {author.length>0 && searchBool && authors.filter((ele)=>{if(ele.name.toLowerCase().startsWith(author.toLocaleLowerCase())){return true} else{return false}}).map((ele,index)=>
                        {
                            return(<p onClick={()=>{setAuthor(ele.name);setSearchBook(false)}}>{ele.name}</p>)
                        })}
                    </div>
                    </div>
                   
                    <div className="col-md-2 d-flex">
                        <button style={{height:'40px',width:"100%",alignSelf:"flex-end"}} className="btn btn-warning">Add New Author</button>
                    </div>
                </div>
               
            </div>
            <div className="form-group" style={{marginTop:'20px'}}>
                <div className="row">
                    <div className="col-md-4">
                        <label style={{color:'white'}} htmlFor="priphone">Choose Language</label>
                        <select class="form-control" id="exampleFormControlSelect2">
                            {genres.map((ele,index)=>{
                                return(<option value={ele.gen_id}>{ele.name}</option>)
                            })}
                            
                        </select>
                    </div>
                    <div className="col-md-2 d-flex">
                        <button style={{height:'40px',width:"100%",alignSelf:"flex-end"}}className="btn btn-warning">Add New Language</button>
                    </div>
                    <div className="col-md-4">
                        <label style={{color:'white'}} htmlFor="secphone">Choose Genre</label>
                        <select class="form-control" id="exampleFormControlSelect2">
                        {languages.map((ele,index)=>{
                                return(<option value={ele.lan_id}>{ele.name}</option>)
                            })}
                        </select>
                    </div>
                    <div className="col-md-2 d-flex">
                        <button style={{height:'40px',width:"100%",alignSelf:"flex-end"}}className="btn btn-warning">Add New Genre</button>
                    </div>
                </div>
            </div>
            
            <div className="form-group" style={{marginTop:'20px'}}>
                <label style={{color:'white'}} for="exampleFormControlTextarea1">Example textarea</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
            </div>

            <div className="form-group" style={{marginTop:'20px'}}>
                <div className="row">
                    <div className="col">
                        <label style={{color:'white'}} htmlFor="priphone">Price</label>
                        <input type="text" className="form-control" id="priphone" name="priphone"  placeholder="Enter Your Primary Phone No. for Password"/>
                    </div>
                    <div className="col">
                        <label style={{color:'white'}} htmlFor="secphone">Copies</label>
                        <input type="text" className="form-control" id="secphone" name="secphone" placeholder="Enter Yoour Secondary Phone No."/>
                    </div>
                    
                </div>
            </div>
            <button style={{marginTop:'30px'}} type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    )
}

export default AddBook;
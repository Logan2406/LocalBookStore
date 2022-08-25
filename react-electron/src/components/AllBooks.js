import  {useState,useEffect} from 'react';
import axios from 'axios';
const AllBooks =() =>
{

    const [books,setBooks] = useState([])


    const [booksearch,setBooksearch] = useState(""); 
    const [lan,setLan] = useState("All");
    const [gen,setGen] = useState("All");   

    const handleSearch =(e) =>
    {
        setBooksearch(e.target.value)
    }
    
    const getData= async() =>
    {
            let response = await axios.get('http://localhost:5000/admin/getBooks').then(data=>data.data.books).catch(err=>err);
            setBooks(response);
    }

    const handleGen =(e) =>
    {
        setGen(e.target.value)
    }

    const handleLan = (e) =>
    {
        setLan(e.target.value)
        
    }



    useEffect(()=>{

        getData()
        setGen("All")
        setLan("All")
        setBooksearch("")

    },[])

    const openAboutWindow = (id) =>
    {
        window.open('http://localhost:3000/aboutBook/'+id, '_blank', 'width=600,height=600')
    }

    return(
        <div style={{paddingTop:"30px"}}>
           <div class="form-group" style={{marginBottom:"20px"}}>
                <div className="row">
                    <div className="col-6">
                        <label for="booksearch" style={{color:'white',fontSize:'30px'}}>Search Book</label>
                        <input type="text" class="form-control" value={booksearch} onChange={handleSearch} id="booksearch" placeholder="Enter Book Name"/>
                    </div>
                    <div className="col-2">
                    <label for="selectlan"  style={{color:'white',fontSize:'30px'}}>Language:</label>
                        <select class="form-control" onChange={handleLan} id="selectlan">
                        <option selected={lan==="All"} value="All">All</option>
                        <option selected={lan==="Bengali"} value="Bengali">Bengali</option>
                        <option selected={lan==="English"} value="English">English</option>
                        </select>
                    </div>
                    <div className="col-2">
                    <label for="selectgen" style={{color:'white',fontSize:'30px'}}>Genre:</label>
                        <select class="form-control" onChange={handleGen} id="selectgen">
                        <option selected={gen==="All"} value="All">All</option>
                        <option selected={gen==="Romantic"} value="Romantic">Romantic</option>
                        <option selected={gen==="Kids"} value="Kids">Kids</option>
                        <option selected={gen==="Thriller"} value="Thriller">Thriller</option>
                        <option selected={gen==="Mythology"} value="Mythology">Mythology</option>
                        <option selected={gen==="Horror"} value="Horror">Horror</option>
                        <option selected={gen==="Fantasy"} value="Fantasy">Fantasy</option>
                        </select>
                    </div>
                </div>
               
            </div>
            <table class="table table-dark" style={{boxShadow:'5px 10px 5px 20px #203A43'}}>
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Book Name</th>
                <th scope="col">Author</th>
                <th scope="col">#Copies</th>
                <th scope="col">Genre</th>
                <th scope="col">Language</th>
                <th scope="col" style={{textAlign:'center'}}>Actions</th>
                </tr>
            </thead>
            <tbody>
            {books.filter((ele)=>{if(ele.book_name.toLocaleLowerCase().includes(booksearch.toLocaleLowerCase()))
                                {return true}
                                else{
                                    return false
                                }
                                }).filter((ele)=>{
                                        if(lan==="All")
                                        {
                                            return true
                                        }
                                        else
                                        {
                                            if(lan===ele.lan_name)
                                            {
                                                return true
                                            }
                                            else
                                            {
                                                return false
                                            }
                                        }
                                
                                }).filter((ele)=>{
                                    if(gen==="All")
                                        {
                                            return true
                                        }
                                        else
                                        {
                                            if(gen===ele.gen_name)
                                            {
                                                return true
                                            }
                                            else
                                            {
                                                return false
                                            }
                                        }
                                }).map((ele,index)=>
            {
                return(<tr>
                    <th scope="row">{index+1}</th>
                    <td><img style={{height:'80px',width:'50px'}} src={ele.img_path}/></td>
                    <td>{ele.book_name}</td>
                    <td>{ele.auth_name}</td>
                    <td>{ele.copies}</td>
                    <td>{ele.lan_name}</td>
                    <td>{ele.gen_name}</td>
                    <td style={{}}>
                        <button style={{marginRight:'20px',marginTop:'5px'}} onClick={()=>openAboutWindow(ele.book_id)} className="btn btn-warning">About</button>
                        <button style={{marginRight:'20px',marginTop:'5px'}} className="btn btn-success">Edit</button>
                        <button style={{marginRight:'20px',marginTop:'5px'}} className="btn btn-danger">Delete</button>
                    </td>
                </tr>)
            })}
            </tbody>
            </table>
        </div>
    )
}

export default AllBooks;
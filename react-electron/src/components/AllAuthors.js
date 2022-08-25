import  {useState,useEffect} from 'react';
import axios from 'axios';


const AllAuthors = () =>
{

    const [authors,setAuthors] = useState([]);

    const [searchauthor,setSearchauthor] = useState("")

    const [countries,setCountries] = useState([])

    const [searchCountry,setSearchCountry] = useState("All")

    const openAboutWindow =(id) =>
    {
        window.open('http://localhost:3000/aboutAuthor/'+id, '_blank', 'width=600,height=600')
    }
    
    
    const getData =  async() =>
    {
        let response = await axios.get('http://localhost:5000/admin/getAuthors').then(data=>data.data).catch(err=>err);
        setAuthors(response.authors);
        setCountries(response.countries);
    }


    const handleSearch =(e) =>
    {
        setSearchauthor(e.target.value)
    }

    const handleCountry=(e) =>
    {
        setSearchCountry(e.target.value)
    }

    useEffect(()=>
    {
        getData()
    },[])



    return(
        <div style={{paddingTop:"30px"}}>
           <div class="form-group" style={{marginBottom:"20px"}}>
                <div className="row">
                    <div className="col-6">
                        <label for="searchauthor" style={{color:'white',fontSize:'30px'}}>Search Author</label>
                        <input type="text" class="form-control" value={searchauthor} onChange={handleSearch} id="searchauthor" placeholder="Enter Auhtor Name"/>
                    </div>
                    <div className="col-2">
                    <label for="selectcountry"  style={{color:'white',fontSize:'30px'}}>Country</label>
                        <select class="form-control" onChange={handleCountry} id="selectcountry">
                        <option selected={searchCountry==="All"} value="All">All</option>
                        {countries===undefined?"":countries.map((ele)=>
                        {
                            return(<option selected={searchCountry===ele.country} value={ele.country}>{ele.country}</option>)
                        })}
                        </select>
                    </div>
                </div>
            </div>
            <table style={{boxShadow:'5px 10px 5px 20px #203A43',maxWidth:'70%'}} class="table table-dark">
            <thead>
                <tr>
                <th scope="col" style={{textAlign:'center'}}>#</th>
                <th scope="col">Author Name</th>
                <th scope="col">Country</th>
                <th scope="col" style={{}}>Actions</th>
                </tr>
            </thead>
            <tbody>
            {authors.filter((ele)=>{if(ele.name.toLocaleLowerCase().includes(searchauthor.toLocaleLowerCase())){return true}else{return false}})
            .filter((ele)=>
            {
                if(searchCountry==="All")
                {
                    return true;
                }
                else
                {
                    if(searchCountry===ele.country)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            })
            .map((ele,index)=>
            {
                return(<tr>
                    <th style={{textAlign:'center'}} scope="row">{index+1}</th>
                    <td style={{width:'20em'}}>{ele.name}</td>
                    <td>{ele.country}</td>
                    <td style={{}}>
                        <button style={{marginRight:'20px',marginTop:'5px'}} onClick={()=>openAboutWindow(ele.auth_id)} className="btn btn-warning">About</button>
                        <button style={{marginRight:'20px',marginTop:'5px'}} className="btn btn-success">Edit</button>
                    </td>
                </tr>)
            })}
            </tbody>
            </table>
        </div>
    )
}

export default AllAuthors;
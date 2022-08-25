import {useState,useEffect} from 'react'
import axios from 'axios';

const IssueHistory = () =>
{

    const [issues,setIssues] = useState([])
    
    const getData = async() =>
    {
        let response = await axios.get("http://localhost:5000/admin/issuehis").then(data=>data.data.issues).catch(err=>err)
        setIssues(response)
    }

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
                <th scope="col">Book Image</th>
                <th scope="col">Book Name</th>
                <th scope="col">User_id</th>
                <th scope="col">Name</th>
                <th scope="col">Date of Issue</th>
                <th scope="col">Date of Return</th>
                <th scope="col">Penalty</th>
                </tr>
            </thead>
            <tbody>
            {issues.map((ele,index)=>
            {
                return(
                    <tr>
                        <td>{index+1}</td>
                        <td><img style={{height:'80px',width:'50px'}} src={ele.img_path}/></td>
                        <td>{ele.book_name}</td>
                        <td>{ele.username}</td>
                        <td>{ele.user_name}</td>
                        <td>{ele.issue_date===undefined?'':ele.issue_date.split("T")[0]}</td>
                        <td>{ele.return_date===undefined?'':ele.return_date.split("T")[0]}</td>
                        <td>{ele.penalty}</td>
                    </tr>
                )
            })}
            </tbody>
            </table>
        </div>
    )

}

export default IssueHistory;
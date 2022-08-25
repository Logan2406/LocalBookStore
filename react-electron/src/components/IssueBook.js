import {useState,useEffect} from 'react'
import axios from 'axios'

const IssueBook =() =>
{
    const [issues,setIssues] = useState([]);
    const [demo,setDemo] = useState(false)


    const returnBook = async(issue_id,issue_date) =>
    {
        let answer = window.confirm(" Are you sure ?");

        if(answer)
        {
            let penalty = penaltyCal(issue_date)
            let response = await axios.post("http://localhost:5000/admin/returnbook",{issue_id:issue_id,penalty:penalty}).then(data=>data.data.msg).catch(err=>err);
            
        }
        else
        {
            console.log("Deny")
            setDemo(false)
        }
    }



    const estimated =(date) =>
    {
       let myDate = new Date(date)
       myDate.setDate(myDate.getDate()+7) 
       return myDate.toISOString().split("T")[0]
    }

    const penaltyCal = (date) =>
    {
        let myDate = new Date(date)
        let today = new Date()

        let timeDiff = Math.abs(today-myDate)
        let dayDiff = Math.ceil(timeDiff/(1000*60*60*24))

        if(dayDiff<7)
        {
            return 0;
        }

        return (dayDiff-7)*5;


    }

    const getData = async() =>
    {
        let response = await axios.get("http://localhost:5000/admin/allissues").then(data=>data.data.issues).catch(err=>err)
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
                <th scope="col">User_name</th>
                <th scope="col">Date of Issue</th>
                <th scope="col">Estimated Return Date</th>
                <th scope="col">Penalty</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
            {issues.map((ele,index)=>
            {
                return(
                    <tr>
                        <td>{index+1}</td>
                        <td>{ele.img_path}</td>
                        <td>{ele.book_name}</td>
                        <td>{ele.username}</td>
                        <td>{ele.user_name}</td>
                        <td>{ele.issue_date===undefined?'':ele.issue_date.split("T")[0]}</td>
                        <td>{ele.issue_date===undefined?'':estimated(ele.issue_date)}</td>
                        <td>{ele.issue_date===undefined?'':penaltyCal(ele.issue_date)}</td>
                        <td><button onClick={()=>returnBook(ele.issue_id,ele.issue_date)} className="btn btn-danger">Return</button></td>
                    </tr>
                )
            })

            }
            </tbody>
            </table>
            {demo?"THis is demo":""}
        </div>
    )
}

export default IssueBook;
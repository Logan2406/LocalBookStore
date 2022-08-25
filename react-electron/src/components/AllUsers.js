import {useState,useEffect} from 'react'
import axios from 'axios';

const AllUsers = () =>
{
    const [users,setUsers] = useState([]);

    const getData = async()=>
    {
        let response = await axios.get('http://localhost:5000/admin/getUsers').then(data=>data.data.users).catch(err=>err);
        setUsers(response);
    }

    useEffect(()=>
    {
        getData()

    },[])

    return(
        <div style={{paddingTop:'50px'}}>
            <table class="table table-dark" style={{boxShadow:'5px 10px 5px 20px #203A43'}}>
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">DOB</th>
                <th scope="col">Aadhar No</th>
                <th scope="col">Primary Mobile Number</th>
                <th scope="col">Secondary Mobile Number</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
            {users.map((ele,index)=>
            {
                return(
                <tr>
                    <td>{index+1}</td>
                    <td>{ele.username}</td>
                    <td>{ele.name}</td>
                    <td>{ele.address}</td>
                    <td>{ele.dob===undefined?" ":ele.dob.split("T")[0]}</td>
                    <td>{ele.aadhar}</td>
                    <td>{ele.pri_mob}</td>
                    <td>{ele.sec_mob}</td>
                    <td><button className="btn btn-warning">About</button></td>
                </tr>
                )
            })}
                
            </tbody>
            </table>
        </div>
    )
}

export default AllUsers;
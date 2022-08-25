import {useState,useEffect} from 'react'
import axios from 'axios'


const AddUser = () =>
{

    const [user,setUser] = useState({username:'',name:'',address:'',priphone:'',secphone:'',dob:''})

    const changeHandler=(e) =>
    {
          setUser({...user,[e.target.name]:e.target.value});  
    }

    const submitHandler = async(e) =>
    {
        e.preventDefault();
        const response = await axios.post("http://localhost:5000/admin/adduser",{...user},{"headers":{"content-type":"application/json"}}).then(data=>data.data.msg).catch(err=>err);
        //console.log(response)
        setUser({...user,username:'',name:'',address:'',priphone:'',secphone:'',dob:''})

    }

    return(
        <div style={{margin:"60px"}}>
        <form onSubmit={submitHandler}>
            <div className="form-group m-3">
                <div className="row">
                    <div className="col-md-3">
                        <label style={{color:'white'}} htmlFor="username">Enter Username</label>
                        <input type="text" value={user.username} onChange={changeHandler} className="form-control" id="username" name="username"  placeholder="Enter Aadhar Number"/>
                    </div>
                    <div className="col">
                        <label style={{color:'white'}} htmlFor="name">Enter Name</label>
                        <input type="text" value={user.name} onChange={changeHandler} className="form-control" id="name" name="name" placeholder="Enter Your Full Name"/>
                    </div>
                </div>
               
            </div>
            <div className="form-group m-3">
                <label style={{color:'white'}} htmlFor="address">Full Address</label>
                <input type="text" value={user.address} onChange={changeHandler} className="form-control" id="address" name="address" aria-describedby="emailHelp" placeholder="Enter Your Full Address"/>
            </div>
            <div className="form-group m-3">
                <div className="row">
                    <div className="col">
                        <label style={{color:'white'}} htmlFor="priphone">Primary Phone Number</label>
                        <input value={user.priphone} onChange={changeHandler} type="text" className="form-control" id="priphone" name="priphone"  placeholder="Enter Your Primary Phone No. for Password"/>
                    </div>
                    <div className="col">
                        <label style={{color:'white'}} htmlFor="secphone">Secondary Phone Number</label>
                        <input value={user.secphone} onChange={changeHandler} type="text" className="form-control" id="secphone" name="secphone" placeholder="Enter Yoour Secondary Phone No."/>
                    </div>
                    <div className="col">
                        <label style={{color:'white'}} htmlFor="dob">Date of Birth</label>
                        <input  value={user.dob} onChange={changeHandler} type="date" className="form-control" id="dob" name="dob" placeholder="Enter the Date of Birth"/>
                    </div>
                </div>
            </div>

            <button type="submit" className="btn btn-primary m-3">Submit</button>
        </form>
        </div>
    )
}

export default AddUser
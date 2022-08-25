import "./sidebar.css"
import {NavLink} from "react-router-dom"
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
const Sidebar = () =>
{
    const navigate=useNavigate();
   

    return(
        <div className="sider" style={{width:'250px'}}>
            <img onClick={()=>navigate("/")} style={{height:"",width:"90%"}} src="/icons/reading.png"/>
            <div className="d-flex flex-column justify-content-start">
                    <div className="nav">
                        <NavLink className={({isActive})=>(isActive?'active':'inactive')} style={{padding:"20px",border:"2px solid red", borderRadius:"20px",margin:"10px"}} to="/link1">Book Section</NavLink>
                    </div>
                    
                    <div className="nav">
                        <NavLink className={({isActive})=>(isActive?'active':'inactive')} style={{padding:"20px",border:"2px solid red", borderRadius:"20px",margin:"10px"}} to="/link2">Author Section</NavLink>
                    </div>
                    <div className="nav">
                        <NavLink className={({isActive})=>(isActive?'active':'inactive')} style={{padding:"20px",border:"2px solid red", borderRadius:"20px",margin:"10px"}} to="/link3">User Section</NavLink>
                    </div>
                    
                    <div className="nav">
                        <NavLink className={({isActive})=>(isActive?'active':'inactive')} style={{padding:"20px",border:"2px solid red", borderRadius:"20px",margin:"10px"}} to="/link4">Miscellaneous</NavLink>
                    </div>
                    
                    
            </div>
            <div className="footer">

            </div>
               
        </div>
    )

}

export default Sidebar;
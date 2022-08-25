import {Routes,Route,NavLink} from 'react-router-dom'
import AllAuthors from './AllAuthors';
import AddUser from './AddUser';
import IssueBook from './IssueBook';
import AllUsers from './AllUsers';


const Link3 =() =>
{
    return(
        <div>
        <div>
            <h1 style={{textAlign:'center',marginBottom:'50px',textShadow:'4px 3px #ff0000',color:"white",fontSize:'50px'}}>Users Section</h1>
        </div>
        <div>
            <div >
                <div className="d-flex justify-content-between" style={{columnGap:'40px'}}>
                    <NavLink style={{padding:"10px",borderRadius:'20px',fontSize:'50px',border:'2px solid white'}} to="allusers">All Users</NavLink>
                    <NavLink style={{padding:"10px",borderRadius:'20px',fontSize:'50px',border:'2px solid white'}} to="issuebook">Show Issued Book</NavLink>
                    <NavLink style={{padding:"10px",borderRadius:'20px',fontSize:'50px',border:'2px solid white'}} to="adduser">Add User</NavLink>
                </div>
                
                <div>
                <Routes>
                    <Route path="allusers" element={<AllUsers/>}/>
                    <Route path="issuebook" element={<IssueBook/>}/>
                    <Route path="adduser" element={<AddUser/>}/>
                </Routes>
                </div>
                
            </div>
        </div>
    </div>
    )
}
export default Link3;
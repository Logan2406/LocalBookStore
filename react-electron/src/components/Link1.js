import {Routes,Route,NavLink} from 'react-router-dom'
import AddBook from './AddBook';
import AllBooks from './AllBooks';
import IssueHistory from './IssueHistory';
import "./Link1.css"

const Link1 =() =>
{
    return(
        <div>
            <div>
                <h1 style={{textAlign:'center',marginBottom:'50px',textShadow:'4px 3px #ff0000',color:"white",fontSize:'50px'}}>Books Section</h1>
            </div>
            <div>
                <div >
                    <div className="d-flex justify-content-between" style={{columnGap:'40px'}}>
                        <NavLink style={{padding:"10px",fontSize:'50px',borderRadius:'20px',border:'2px solid white',}} to="allbooks">All Books</NavLink>
                        <NavLink style={{padding:"10px",fontSize:'50px',borderRadius:'20px',border:'2px solid white',}} to="issuehistory">Issue Book History</NavLink>
                        <NavLink style={{padding:"10px",fontSize:'50px',borderRadius:'20px',border:'2px solid white',}} to="addbook">Add Book</NavLink>
                    </div>
                    
                    <div>
                    <Routes>
                        <Route path="allbooks" element={<AllBooks/>}/>
                        <Route path="issuehistory" element={<IssueHistory/>}/>
                        <Route path="addbook" element={<AddBook/>}/>
                    </Routes>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default Link1;
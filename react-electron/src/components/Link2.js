import {Routes,Route,NavLink} from 'react-router-dom'
import AllAuthors from './AllAuthors';
import AddAuthor from './AddAuhtor';
import Reviews from './Reviews';

const Link2 =() =>
{
    return(
        <div>
        <div>
            <h1 style={{textAlign:'center',marginBottom:'50px',textShadow:'4px 3px #ff0000',color:"white",fontSize:'50px'}}>Authors' Section</h1>
        </div>
        <div>
            <div >
                <div className="d-flex justify-content-between" style={{columnGap:'40px'}}>
                    <NavLink style={{padding:"10px",borderRadius:'20px',fontSize:'50px',border:'2px solid white'}} to="allauthors">All Authors</NavLink>
                    <NavLink style={{padding:"10px",borderRadius:'20px',fontSize:'50px',border:'2px solid white'}} to="allreviews">All Reviews</NavLink>
                    <NavLink style={{padding:"10px",borderRadius:'20px',fontSize:'50px',border:'2px solid white'}} to="addauthor">Add Author</NavLink>
                </div>
                
                <div>
                <Routes>
                    <Route path="allauthors" element={<AllAuthors/>}/>
                    <Route path="allreviews" element={<Reviews/>}/>
                    <Route path="addauthor" element={<AddAuthor/>}/>
                </Routes>
                </div>
                
            </div>
        </div>
    </div>
    )
}
export default Link2;
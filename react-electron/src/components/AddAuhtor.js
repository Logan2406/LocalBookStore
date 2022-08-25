const AddAuthor =()=>
{
    return(
        <div style={{margin:"60px"}}>
        <form>
            <div className="form-group">
                <div className="row">
                    <div className="col-md-10">
                        <label style={{color:'white'}} htmlFor="username">Enter Author Name</label>
                        <input type="text" className="form-control" id="username" name="username"  placeholder="Enter Author Name"/>
                    </div>
                    <div className="col-md-2">
                        <label style={{color:'white'}} htmlFor="username">Country name</label>
                        <input type="text" className="form-control" id="username" name="username"  placeholder="Country Name"/>
                    </div>
                </div>
            </div>
            <button style={{marginTop:'30px'}} type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    )
}

export default AddAuthor;
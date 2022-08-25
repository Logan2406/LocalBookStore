import {useParams}  from 'react-router-dom'
import {useState,useEffect} from 'react'
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

const MyModal = (props) =>
{

    const [username,setUserName] = useState("")
    const [enable,setEnable] = useState(true)
    
    const verifyUser = async(e) =>
    {
        console.log('Username :'+username)
        e.preventDefault();
        let response = await axios.post("http://localhost:5000/admin/verifyUser",{username:username},
                                        {headers:{'Content-Type': 'application/json'}}).then(data=>data.data.msg).catch(err=>err)
        if(response==="NO_USER")
        {
            setEnable(true)
        }
        else if(response==="ALREADY_ISSUED")
        {
            setEnable(true)
        }
        else
        {
            setEnable(false)
        }
    }

    const handleChange = (e) =>
    {
        setUserName(e.target.value);
    }
    const submitHandler = async(e) =>
    {
        let response = await axios.post("http://localhost:5000/admin/issuebook",{username:username,bookid:props.book_id},
                {headers:{'Content-Type': 'application/json'}}).then(data=>data.data.msg).catch(err=>err)
        if(response==="Updated Successfully")
        {
            props.setBoolVal((prev)=>!prev)
            props.onHine()
           
        }
    }

    return(
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Issue Book
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form onSubmit={submitHandler}>
            <div class="form-group">
                <label for="bookId">Book Id</label>
                <input type="text" value={props.book_id} class="form-control" id="bookId" aria-describedby="emailHelp" disabled={true}/>
            </div>
            <div class="form-group">
            <div className="row">
                <div className="col">
                    <label for="username">Username</label>
                    <input onChange={handleChange} type="text" class="form-control" id="username" placeholder="Enter Username "/>
                </div>
                <div className="col">
                    <button style={{marginTop:'25px'}} onClick={verifyUser} className="btn btn-warning">Verify User</button>
                </div>
            </div>
               
            </div>

            <button disabled={enable} style={{marginTop:'20px'}} type="submit" class="btn btn-primary">Submit</button>
            </form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-danger" onClick={props.onHide}>Close</button>
      </Modal.Footer>


    </Modal>)
}

const AboutBook = () =>
{
    const params = useParams();
    const [book,setBook] = useState({});
    const [modalShow,setModalShow] = useState(false);
    const [boolVal,setBoolVal]  = useState(false);

    const getInfo =async() =>
    {
        const response = await axios.get("http://localhost:5000/admin/getBookDetails/"+params.id).then(data=>data.data.book).catch(err=>err);
        setBook(response);
    }

    useEffect(()=>
    {
        getInfo()
    },[boolVal])

    const openReview =() =>
    {
        window.open('http://localhost:3000/bookReview/'+params.id, '_blank', 'width=600,height=600')
    }

    return(
        <div style={{display:'flex',minWidth:'400px',flexDirection:'row',columnGap:'20px',backgroundColor:'white',borderRadius:'20px',border:'1px solid white',padding:'20px',margin:'50px'}}>
           <div style={{flex:1,rowGap:'10px',display:'flex',flexDirection:'column',backgroundColor:'transparent'}}>
                <img style={{height:'280px',width:'180px'}} src={book.img_path}/>
                <button onClick={()=>setModalShow(true)} className="btn btn-warning">Issue Book</button>
                <button onClick={openReview}className="btn btn-success">Reviews</button>
           </div>
           <div style={{flex:4,backgroundColor:'white',display:'flex',flexDirection:'column'}}>
                <h5 style={{backgroundColor:'transparent'}}>Name :  {book.book_name}</h5>
                <hr style={{marginLeft:0,textAlign:'left',width:'90%'}}/>
                <h5 style={{backgroundColor:'transparent'}}>Author :  {book.auth_name}</h5>
                <hr style={{marginLeft:0,textAlign:'left',width:'90%'}}/>
                <h5 style={{backgroundColor:'transparent'}}>No of Coppies Left :  {book.copies}</h5>
                <hr style={{marginLeft:0,textAlign:'left',width:'90%'}}/>
                <h5 style={{backgroundColor:'transparent'}}>Language: {book.img_path===undefined?' ':book.img_path.split("/")[2]} </h5>
                <hr style={{marginLeft:0,textAlign:'left',width:'90%'}}/>
                <h5 style={{backgroundColor:'transparent'}}>Genre : {book.img_path===undefined?' ':book.img_path.split("/")[3]}  </h5>
                <hr style={{marginLeft:0,textAlign:'left',width:'90%'}}/>
           </div>
           <MyModal setBoolVal={setBoolVal} show={modalShow} book_id={params.id} onHide={()=>setModalShow(false)}/>
           
        </div>
    )
}

export default AboutBook;
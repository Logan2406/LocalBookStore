import {View,Text,FlatList,Image,TouchableOpacity,Modal,Alert,Button,TextInput,ImageBackground,Dimensions} from "react-native"
import { useState,useEffect,useContext } from "react"
import { Rating, AirbnbRating } from 'react-native-ratings';
import axios from 'axios'
import { AuthContext } from "../../AuthContext";
const Book =({item}) =>
{
    
    const {userDet} = useContext(AuthContext)
    
    const [modalVisible,setModalVisible] = useState(false);

    const [review,setReview] = useState("");

    const [demoRating,setDemoRating]  = useState(" ")
    const [rating,setRating] = useState(1);

    const [reviewGiven,setReviewGiven] = useState(false);

    const handleReview = (inputVal) =>
    {
        setReview(inputVal)
    }

    const ratingComp = (rating) =>
    {
        setDemoRating(rating)
        setRating(rating)
    }

    const getReview = async() =>
    {
        let response =  await axios.get(`http://10.0.2.2:5000/user/isreview/${item.id}`,{
            headers: {'Content-Type': 'application/json','token':userDet.accTok}
          }).then(data=>data.data.msg).catch(err=>err);

          if(response==="NO_REV")
          {
            setReviewGiven(false)
          }
          else
          {
            setReviewGiven(true)
          }
          
    }

    useEffect(()=>
    {
        getReview()
    },[])


    const submitReview = async() =>
    {
        let response =  await axios.post(`http://10.0.2.2:5000/user/addreview/${item.id}`,{rating:rating,review:review},{
            headers: {'Content-Type': 'application/json','token':userDet.accTok}
          }).then(data=>data.data.msg).catch(err=>err);
          setModalVisible(false)
    }


    return(
        <View style={{elevation:2,borderRadius:20,margin:20}}>

            <Modal  animationType="slide"
                    visible={modalVisible}
                    >
                    <ImageBackground resizeMode="cover" source={require("./../../assets/profilebackground.jpg")} style={{position:'absolute',left:0, 
        right:0, 
        top:0,
        bottom:0,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height}}>
                <View style={{flex:1,margin:20}}>
                    <Text style={{textAlign:'center',fontSize:40,color:"white"}}>Add Review</Text>
                    <TextInput multiline={true} onChangeText={handleReview} numberOfLines={6} style={{padding:10,backgroundColor:'rgba(210, 206, 193,0.5)',marginBottom:10,borderRadius:20}}/>
                    <View>
                    <AirbnbRating
                        count={5}
                        reviews={["Bad","OK", "Good", "Very Good", "Amazing"]}
                        defaultRating={rating}
                        showRating
                        onFinishRating={ratingComp}
                        size={20}/>

                    </View>

                    <Text>{demoRating}</Text>
                    <View style={{marginBottom:10}}>  
                        <Button color="#db5e84" onPress={submitReview} title='Submit Review'/>
                    </View>
                   <View>
                        <Button title='Close' onPress={()=>setModalVisible(false)}/>
                   </View>
                    
                </View>
                </ImageBackground>
            </Modal>


        <View style={{flexDirection:'row',padding:20,borderRadius:20,backgroundColor:"rgba(9, 111, 97,0.9)"}}>
            <View style={{flex:1}}>
                <Image style={{width:70,height:120}} source={require("../../assets/da_vinci.jpg")}/>
            </View>
            <View style={{flex:2}}>
                    <Text style={{color:"white"}}>Book name : {item.book_name}</Text>
                    <Text style={{color:"white"}}>Author name : {item.auth_name}</Text>
                    <Text style={{color:"white"}}>Review Already given : {reviewGiven?"Yes":"No"}</Text>
                    <TouchableOpacity onPress={()=>setModalVisible(true)}style={{alignSelf:'flex-end',marginTop:20,marginRight:10,padding:10,borderRadius:20,borderWidth:1,borderColor:'red',backgroundColor:"rgb(243, 185, 0)"}}>
                            <Text>Add Review</Text>
                    </TouchableOpacity>
            </View>
        </View>
        </View>
    )
}

const AddReview = () =>
{
    const {userDet} = useContext(AuthContext);
    const [books,setBooks] = useState([]);

    const getData = async() =>
    {
        let response =  await axios.get(`http://10.0.2.2:5000/user/myallbooks`,{
            headers: {'Content-Type': 'application/json','token':userDet.accTok}
          }).then(data=>data.data.books).catch(err=>err);

        setBooks(response);
    }

    useEffect(()=>
    {
      getData()
    },[])


    const renderBook =({item})=>{
        return(
            <Book item={item}/>
        )
    }

    


    return(
        <ImageBackground resizeMode="cover" source={require("./../../assets/homebackground.jpg")} style={{position:'absolute',left:0, 
        right:0, 
        top:0,
        bottom:0,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height}}>
        <View>
            <FlatList
                data={books}
                renderItem={renderBook}
                keyExtractor={item=>item.id}
            />
        </View>
        </ImageBackground>
    )
}

export default AddReview
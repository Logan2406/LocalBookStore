import {View,Text,FlatList,Image,TouchableOpacity,Modal,Alert,Button,TextInput,SafeAreaView,ImageBackground,Dimensions} from "react-native"
import {useState,useEffect,useContext} from 'react'
import axios from 'axios'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { AuthContext } from '../../AuthContext'

const Item =({item}) =>
{
    const {userDet} = useContext(AuthContext)

    const [modalVisible,setModalVisible] = useState(false)

    const [reviewEdit,setReviewEdit] = useState(item.review)
    const [ratingEdit,setRatingEdit] = useState(item.rating)
    

    const editReview= async() =>
    {
        let response = await axios.post(`http://10.0.2.2:5000/user/editreview/${item.id}`,{rating:ratingEdit,review:reviewEdit},{
            headers: {'Content-Type': 'application/json','token':userDet.accTok}
          }).then(data=>data).catch(err=>err);
        
        setModalVisible(false)

    }

    const deleteReview = async() =>
    {
        let response = await axios.get(`http://10.0.2.2:5000/user/deletereview/${item.id}`,{
            headers: {'Content-Type': 'application/json','token':userDet.accTok}
          }).then(data=>data).catch(err=>err);
    }

    const handleReview = (text) =>
    {
        setReviewEdit(text)
    }

    const ratingComp = (rating) =>
    {
        setRatingEdit(rating)
    }


        return(
                <>
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
                    <Text style={{textAlign:'center',color:"white",fontSize:40,fontWeight:'bold'}}>Edit Review</Text>
                    <TextInput multiline={true} value={reviewEdit} onChangeText ={handleReview} numberOfLines={6} style={{padding:10,backgroundColor:'rgba(226, 214, 211,0.7)',marginBottom:10,borderRadius:20}}/>
                    <View>
                    <AirbnbRating
                        count={5}
                        reviews={["Bad","OK", "Good", "Very Good", "Amazing"]}
                        defaultRating={ratingEdit}
                        showRating
                        onFinishRating={ratingComp}
                        size={20}/>

                    </View>
                    <View style={{marginBottom:10}}>  
                        <Button color="#db5e84" onPress={editReview} title='Submit Review'/>
                    </View>
                <View>
                        <Button title='Close' onPress={()=>setModalVisible(false)}/>
                </View>
                    
                </View>
                </ImageBackground>
            </Modal>
                
            <View style={{elevation:2,borderRadius:20,margin:20}}>
            <View style={{flexDirection:'row',padding:20,borderRadius:20,backgroundColor:"rgba(11, 113, 87,0.9)"}}>
                <View style={{flex:1}}>
                    <Image style={{width:70,height:120}} source={require("../../assets/da_vinci.jpg")}/>
                    <Text style={{paddingRight:20,color:'white',fontWeight:'bold',fontSize:15}}>{item.book_name}</Text>
                </View>
                <View style={{flex:2,justifyContent:'space-between'}}>
                    <View>
                        <Text style={{textAlign:"center",fontWeight:'bold',color:'white'}}>My Review :</Text>
                        <Text style={{textAlign:"center",color:'white'}}>{item.review}</Text>
                        <AirbnbRating
                        count={5}
                        reviews={["Bad","OK", "Good", "Very Good", "Amazing"]}
                        defaultRating={item.rating}
                        isDisabled={true}
                        showRating
                        //onFinishRating={ratingComp}
                        size={20}/>
                    </View>
                    
                    <View style={{flexDirection:'row',alignSelf:'flex-end'}}>
                        <TouchableOpacity  onPress={()=>setModalVisible(true)} style={{alignSelf:'flex-end',marginTop:20,marginRight:10,padding:10,borderRadius:20,borderWidth:1,borderColor:'white',backgroundColor:'rgba(96, 19, 4,0.8)'}}>
                            <Text style={{color:'white'}}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{alignSelf:'flex-end',marginTop:20,marginRight:10,padding:10,borderRadius:20,borderWidth:1,borderColor:'white',backgroundColor:'rgba(96, 19, 4,0.8)'}}>
                            <Text style={{color:'white'}}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                   
                </View>
            </View>
        
            </View>
            </>
        )
}




const MyReviews = () =>
{
    const {userDet} = useContext(AuthContext)

    const [books,setBooks] = useState([])

    const renderItem = ({item}) =>
    {
        return(
            <Item item={item}/>
        )
    }

    const getData = async() =>
    {
        let response = await axios.get(`http://10.0.2.2:5000/user/allreviews`,{
            headers: {'Content-Type': 'application/json','token':userDet.accTok}
          }).then(data=>data.data.books).catch(err=>err);

          setBooks(response)
    }

    useEffect(()=>
    {
        getData()
    },[])

    return(
        <ImageBackground resizeMode="cover" source={require("./../../assets/authorbackground.jpg")} style={{position:'absolute',left:0, 
        right:0, 
        top:0,
        bottom:0,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height}}>
        <View style={{flex:1}}>
           <FlatList
                data={books}
                renderItem={renderItem}
                keyExtractor={item=>item.id}    
                />
        </View>
        </ImageBackground>
    )
}

export default MyReviews
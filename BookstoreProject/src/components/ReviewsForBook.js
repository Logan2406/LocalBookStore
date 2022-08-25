import {View,FlatList,SafeAreaView,Text,ImageBackground,Dimensions} from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useEffect,useState,useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../../AuthContext'
import { Rating, AirbnbRating } from 'react-native-ratings';


const Review =({item}) =>
{
    return(
        <View style={{margin:20,backgroundColor:'rgba(0, 104, 103,0.8)',padding:10,flexDirection:'row',borderRadius:10}}>
            <View style={{flex:1}}>
                <Text style={{color:'white'}}>User :{item.user_name}</Text>
                <Text style={{marginTop:10,color:'white'}}>{item.review}</Text>
            </View>
            <View style={{flex:1,alignSelf:'flex-end'}}>
            <AirbnbRating
                        count={5}
                        reviews={["Bad","OK", "Good", "Very Good", "Amazing"]}
                        defaultRating={item.rating}
                        isDisabled={true}
                        showRating
                        //onFinishRating={ratingComp}
                        size={20}/>
            </View>

        </View>
    )

}


const ReviewsForBook =() =>
{
    const route = useRoute();
    const {bookId} = route.params
    const {userDet} = useContext(AuthContext)

    const [reviews,setReviews] = useState([])
    const [bookName,setBookName] = useState("")

    const getData=async()=>
    {
        let response = await axios.get(`http://10.0.2.2:5000/user/bookreview/${bookId}`,{
            headers: {'Content-Type': 'application/json','token':userDet.accTok}
          }).then(data=>data.data).catch(err=>err);

          setReviews(response.reviews)
          setBookName(response.bookname)

    }

    useEffect(()=>
    {
        getData()
    },[])


    const renderItem =({item}) =>
    {
        return(<Review item={item}/>)
    }
    
    return(
        <ImageBackground resizeMode="cover" source={require("./../../assets/authorbackground.jpg")} style={{position:'absolute',left:0, 
        right:0, 
        top:0,
        bottom:0,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height}}>
        <View style={{flex:1}}>
        <Text style={{textAlign:'center',fontSize:30,color:'white'}}>{bookName}</Text>
        <FlatList
             data={reviews}
             renderItem={renderItem}
             keyExtractor={item=>item.id}    
             />
     </View>
     </ImageBackground>
    )
}

export default ReviewsForBook
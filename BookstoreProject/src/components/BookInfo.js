import { View,Text,Image,TouchableOpacity,ImageBackground,Dimensions } from "react-native"
import { ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from 'axios'
import Images from "../../ImageSource";
import { useEffect,useState ,useContext} from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../AuthContext";


const BookInfo  =() =>
{
    const navigator = useNavigation();
    const route = useRoute();
    
    const {userDet} = useContext(AuthContext)
    
    const [book,setBook] = useState({});
    const [image,setImage] = useState({})

    const [added,setAdded] = useState(false)

    const getBookInfo=async()=>
    {
        const {bookId} = route.params;
        console.log("I am in book Info")
        let response = await axios.get(`http://10.0.2.2:5000/books/getinfo/${bookId}`,{
            headers: {'Content-Type': 'application/json','token':userDet.accTok}
          }).then(data=>data.data.book).catch(err=>err);
        console.log(JSON.stringify(response))
        setBook(response);

        let genre = response.img_path.split("/")[3];
        let language = response.img_path.split("/")[2];
        let id = response.img_path.split("/")[4].split(".")[0]
        setImage(Images[language][genre][id-1])
        
    }

    const addToWish = async() =>
    {
        const {bookId} = route.params;
        let response = await axios.get(`http://10.0.2.2:5000/user/addwishlist/${bookId}`,{
            headers: {'Content-Type': 'application/json','token':userDet.accTok}
          }).then(data=>data.data.book).catch(err=>err);
    }

    const getWishList = async() =>
    {
        const {bookId} = route.params;
        console.log("I am in wishlist")
        let response = await axios.get(`http://10.0.2.2:5000/user/getwishlist/${bookId}`,{
            headers: {'Content-Type': 'application/json','token':userDet.accTok}
          }).then(data=>data.data.msg).catch(err=>err);

        if(response==="NOT_AV")
        {
            setAdded(false)
        }
        else
        {
            setAdded(true)
        }
    }


    useEffect(()=>
    {
        getBookInfo();
        getWishList();
    },[])




    return(
       
        <ImageBackground resizeMode="cover" source={require("./../../assets/profilebackground.jpg")} style={{position:'absolute',left:0, 
        right:0, 
        top:0,
        bottom:0,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height}}>
         <ScrollView style={{marginBottom:180}}>
            <View style={{justifyContents:'center',alignItems:'center',marginTop:30}}>
                <View style={{backgroundColor:'rgba(127,127,127,0.6)',elevation:20}}> 
                    <Image style={{width:140,height:200}} source={image}/>
                </View>
                <Text style={{margin:10,color:"white"}}>{book.book_name}</Text>
                <TouchableOpacity onPress={()=>navigator.navigate("Author",{author:{name:book.auth_name,authId:book.auth_id}})} style={{padding:10,borderWidth:1,borderRadius:30,borderColor:"white"}}>
                    <Text style={{color:"white"}}>{book.auth_name}</Text>
                </TouchableOpacity>
                <Text style={{marginTop:10,color:"white"}}>
                    No. of Copies Available : {book.copies_left}
                </Text>
               <TouchableOpacity disabled={added} onPress={addToWish} style={{padding:20,marginTop:20,backgroundColor:'#9FBCB5',borderWidth:1,borderRadius:30,borderColor:'rgba(127,127,127,0.6)'}}>
                    {added?<Text>Already in Wishlist</Text>:<Text>Add to Wishlist</Text>}
               </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',margin:20}}>
                <Text style={{flex:1,flexWrap:'wrap',color:'white'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                        It has survived not only five centuries, but also the leap into electronic typesetting, 
                        remaining essentially unchanged. It was popularised in the 1960s with the release of 
                        Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software 
                        like Aldus PageMaker including versions of Lorem Ipsum.
                </Text>
            </View>
            <TouchableOpacity style={{borderColor:'#A1EFDB',
                                        backgroundColor:"rgba(8, 138, 104,0.9)",
                                        borderWidth:2,
                                        padding:20,
                                        borderRadius:30,
                                        margin:20,
                                        flexDirection:'row',
                                        justifyContent:'space-between'}}>
                <View style={{flexDirection:'row'}}>
                    <Image style={{width:40,height:40}} source={require("../../assets/icons/man.png")}/>
                    <Image style={{width:40,height:40}} source={require("../../assets/icons/man.png")}/>
                    <Image style={{width:40,height:40}} source={require("../../assets/icons/man.png")}/>    
                </View>
                <Text style={{alignSelf:'center',color:'white'}}>People Read This Book</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderColor:'red',
                                        backgroundColor:'rgba(4, 93, 128,0.9)',
                                        borderWidth:2,
                                        padding:20,
                                        borderRadius:30,
                                        margin:20,
                                        flexDirection:'column',
                                        justifyContent:'space-between'}}
                                        onPress={()=>navigator.navigate("BookReview",{bookId:route.params.bookId})}
                                        >
                                        
                <Text style={{alignSelf:"center",color:"white",fontSize:30,marginBottom:10}}>Reviews</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{borderWidth:1,borderRadius:30,borderColor:'rgba(127,127,127,0.7)',backgroundColor:'rgba(233, 236, 10,0.9)',padding:20}}>
                        <Text>People's Review</Text>
                    </View>
                    <View style={{borderWidth:1,borderRadius:30,borderColor:'rgba(127,127,127,0.7)',backgroundColor:'rgba(233, 236, 10,0.9)',padding:20}}>
                        <Text>4.7 Rating</Text>
                    </View>
                </View>

            </TouchableOpacity>
        </ScrollView>
        </ImageBackground>
    )
}

export default BookInfo
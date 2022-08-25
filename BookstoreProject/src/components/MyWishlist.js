import { View,Text,Image,ScrollView, ImageBackground,Dimensions,TouchableOpacity,SafeAreaView,FlatList} from "react-native";
import {useState,useEffect,useContext} from "react"
import axios from "axios";
import { AuthContext } from "../../AuthContext";

const ShowBook = ({item,removeItem}) =>
{
    return(
    <View style={{elevation:2,borderRadius:20,margin:20}}>
    <View style={{flexDirection:'row',padding:20,borderRadius:20,backgroundColor:"rgba(5, 118, 122,0.8)"}}>
        <View style={{flex:1}}>
            <Image style={{width:70,height:120}} source={require("../../assets/da_vinci.jpg")}/>
        </View>
        <View style={{flex:2}}>
            <Text style={{color:"#CDDDDE"}}>Book Name: {item.book_name}</Text>
            
            <View
            style={{
                borderBottomColor: '#E4EA88',
                borderBottomWidth: 1,
                marginTop:5
            }}
            />
            <Text style={{color:"#CDDDDE"}}>Author Name: {item.auth_name}</Text>
            <View
            style={{
                borderBottomColor: '#E4EA88',
                borderBottomWidth: 1,
                marginTop:5
            }}
            />
            <Text style={{color:"#CDDDDE"}}>Genre: {item.img_path==undefined?"":item.img_path.split("/")[3]}</Text>
            <View
            style={{
                borderBottomColor: '#E4EA88',
                borderBottomWidth: 1,
                marginTop:5
            }}
            />
            <Text style={{color:"#CDDDDE"}}>Language: {item.img_path==undefined?"":item.img_path.split("/")[2]}</Text>
            <View
            style={{
                borderBottomColor: '#E4EA88',
                borderBottomWidth: 1,
                marginTop:5
            }}
            />
            <Text style={{color:"#CDDDDE"}}>Copies Avalibale: {item.copies_left}</Text>
            <View
            style={{
                borderBottomColor: '#E4EA88',
                borderBottomWidth: 1,
                marginTop:5
            }}
            />
            <TouchableOpacity onPress={()=>{removeItem(item.id)}} style={{alignSelf:'flex-end',marginTop:20,marginRight:10,padding:10,borderRadius:20,borderWidth:1,borderColor:'#CDDDDE',backgroundColor:"#F16417"}}>
                <Text style={{color:"#211108"}}>Remove</Text>
            </TouchableOpacity>
        </View>
    </View>

    </View>
    )
}




const MyWishlist = () =>
{
   
    const [books,setBooks] = useState([])
    const {userDet} = useContext(AuthContext)

    const getData =async() =>
    {
        let response =  await axios.get(`http://10.0.2.2:5000/user/getmywishlist`,{
                headers: {'Content-Type': 'application/json','token':userDet.accTok}
              }).then(data=>data.data.books).catch(err=>err);
              
        setBooks(response)
    }

    useEffect(()=>
    {
        getData()

    },[])

   const removeItem = (id) =>
   {    
        //const newBooks = books.filter((a)=>a.id!=id)
        //setBooks(newBooks)
   }

   const renderBook =({item}) =>
    {
        return(
                <ShowBook removeItem={removeItem} item={item} />
               )
    }                                    

    return(
        
       
        <ImageBackground resizeMode="cover" source={require("./../../assets/homebackground.jpg")} style={{position:'absolute',left:0, 
        right:0, 
        top:0,
        bottom:0,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height}}>
         <View style={{flex:1,marginBottom:160}}>
                <FlatList
                    data={books}
                    renderItem={renderBook}
                    keyExtractor={(item) => item.id}
                />
        </View>
        </ImageBackground>
        
        
    )

}

export default MyWishlist;
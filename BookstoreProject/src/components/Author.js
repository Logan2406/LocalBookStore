import {View,Text,Image,FlatList,TouchableOpacity,SafeAreaView,ImageBackground,Dimensions} from 'react-native'
import { useRoute } from '@react-navigation/native';
import {useState,useEffect,useContext} from 'react'
import axios from 'axios';
import { AuthContext } from '../../AuthContext';

const Book = ({item}) =>
{
    let genre = item.img_path.split("/")[3];
    let language = item.img_path.split("/")[2];
    let id = item.img_path.split("/")[4].split(".")[0]

    return(
        <TouchableOpacity style={{backgroundColor:'rgba(0, 104, 103,0.9)',margin:5,borderRadius:20}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',padding:10}}>
                <Image style={{height:50,width:30}} source={require("./../../assets/icons/book.png")}/>
                <Text style={{alignSelf:"center",color:"white"}}>{item.book_name}</Text>
                <Text style={{alignSelf:"center",color:"white"}}>{genre}</Text>
            </View>
        </TouchableOpacity>
    )
}


const Author = () =>
{
    const route = useRoute()
    const [books,setBooks] = useState([])
    const [author,setAuthor] = useState({});

    const {userDet} = useContext(AuthContext)

    const getAuthorData=async()=>
    {
        let response = await axios.get(`http://10.0.2.2:5000/author/authorinfo/${route.params.author.authId}`,{
            headers: {'Content-Type': 'application/json','token':userDet.accTok}
          }).then(data=>data.data).catch(err=>err);
        setBooks(response.details)
        setAuthor(response.author)
        console.log("This is author"+JSON.stringify(response.author))
        console.log(author.country)
    }                                   
    useEffect(()=>
    {
        getAuthorData();
    },[])

    const renderItem = ({item}) =>{
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
        <View style={{marginBottom:140,marginTop:20,marginLeft:20,marginRight:20}}>

                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                        <Image style={{height:60,width:60}} source={require("../../assets/icons/book_pile.png")}/>
                        <Text>{books.length} Novels</Text>
                    </View>
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <Image style={{height:100,width:100,elevation:5,backgroundColor:'rgba(127,127,127,0.6)',borderRadius:100/2}} source={require("../../assets/icons/man.png")}/>
                        <Text style={{textAlign:'center'}}>{route.params.author.name}</Text>
                    </View>
                    <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                        <Image style={{height:60,width:60}} source={require("../../assets/icons/book_pile.png")}/>
                        <Text>{author.country}</Text>
                    </View>
                </View>
    
                    <FlatList
                            data={books}
                            renderItem={renderItem}
                            keyExtractor={(item)=>item.id}
                        />

        </View>
        </ImageBackground>
    )
}

export default Author;
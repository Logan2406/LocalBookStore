import {View,Text,FlatList,Image, SectionList,SafeAreaView,TouchableOpacity,TextInput,ImageBackground,Dimensions} from 'react-native';
import { useRoute } from '@react-navigation/native';
import {useState,useEffect,useContext} from 'react';
import axios from 'axios';
import Images from '../../ImageSource';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../AuthContext';
const Item = ({item}) =>
{
    const navigator = useNavigation();
    let genre = item.img_path.split("/")[3];
    let language = item.img_path.split("/")[2];
    let id = item.img_path.split("/")[4].split(".")[0]
    //console.log(arr);
    //console.log('Genre'+genre);
    console.log(language);
   const image = Images[language][genre][id-1]

    return(
        <TouchableOpacity onPress={()=>navigator.navigate("BookInfo",{bookId:item.book_id})} style={{backgroundColor:'rgba(3, 105, 79,0.9)',margin:20,padding:10,borderRadius:20,flexDirection:'row'}}>
            <View style={{flex:1}}>
               <Image style={{height:80,width:60}} source={image}/>
            </View>
            <View style={{flex:2}}>
                <Text style={{color:"white"}}>{item.book_name}</Text>
                <Text  style={{color:"white"}}>{item.auth_name}</Text>
                <Text  style={{color:"white"}}>No. of Copies available : {item.copies}</Text>
            </View>
        </TouchableOpacity>
    )
}

const GenreBooks =() =>
{
    const route = useRoute();
    const genre = route.params.name;
    const {userDet} = useContext(AuthContext)

    const [englishBooks,setEnglishBooks] = useState([]);
    const [bengaliBooks,setBengaliBooks] = useState([]);

    const [searchBook,setSearchBook] = useState("");

    const [lang,setLang] = useState({english:true,bengali:true})


    useEffect(()=>
    {    
        async function getData()
        {
            console.log("I am in Get Data")
            let response =  await axios.get(`http://10.0.2.2:5000/books/${genre}/Bengali`,{
                headers: {'Content-Type': 'application/json','token':userDet.accTok}
              }).then(data=>data.data.books).catch(err=>err);
            //console.log("This is response\n"+JSON.stringify(response))
            setBengaliBooks(response);
            response = await axios.get(`http://10.0.2.2:5000/books/${genre}/English`,{
                headers: {'Content-Type': 'application/json','token':userDet.accTok}
              }).then(data=>data.data.books).catch(err=>err);
            //console.log("This is response\n"+JSON.stringify(response))
            setEnglishBooks(response);
        }
        getData()
       
    },[])

    const handleText = (text) =>
    {
        setSearchBook(text)
    }


    const renderItem =({item}) =>
    {
       /* return(
            <Item item={item}/>
        )*/

        if(item.book_name.toLocaleLowerCase().includes(searchBook.toLocaleLowerCase()))
        {
           return(<Item item={item}/>)
        }
    }


    const handleLang =(language) =>
    {
        if(language==="english")
        {
            setLang({...lang,english:!lang.english})
        }
        else
        {
            setLang({...lang,bengali:!lang.bengali})
        }
    }
    return(
        <ImageBackground resizeMode="cover" source={require("./../../assets/homebackground.jpg")} style={{position:'absolute',left:0, 
        right:0, 
        top:0,
        bottom:0,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height}}>
        <View style={{marginBottom:15}}>

        <TextInput
                style={{margin:20,borderRadius:10,borderWidth:2,borderColor:'red',padding:10,backgroundColor:'white'}}
                onChangeText={handleText}
                placeholder="Search for Book"
                value={searchBook}
            />
            <View style={{display:'flex',flexDirection:'row',marginLeft:20}}>
                <TouchableOpacity onPress={()=>handleLang("english")} style={{marginRight:30,padding:10,backgroundColor:lang.english?"#34eb92":"white",borderWidth:2,borderColor:'red',borderRadius:20}}>
                    <Text>English</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>handleLang("bengali")} style={{padding:10,backgroundColor:lang.bengali?"#34eb92":"white",borderWidth:2,borderColor:'red',borderRadius:20}}>
                    <Text>Bengali</Text>
                </TouchableOpacity>
            </View>
       


            <SectionList
                sections={[ 
                            { title: 'Bengali Books', data: lang.bengali?bengaliBooks:[]}, 
                            { title: 'English Books', data: lang.english?englishBooks:[]}, 
                            ]} 
                data={bengaliBooks}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title,data } }) => (<>
                                <Text style={{textAlign:'center',fontSize:40,fontWeight:'bold',color:"white"}}>{title}</Text>
                                <View style={{borderBottomColor:"white",borderBottomWidth:1,marginLeft:20,marginRight:20,marginTop:10}}/>
                                <Text style={{textAlign:'center',fontSize:15,}} >{data.length==0?"No Books to show !!!":""}</Text>
                                </>
                )}
                keyExtractor={(item,index)=>item.book_id+index}
            />
            
            
        </View>
        </ImageBackground>
    )
}

export default GenreBooks;
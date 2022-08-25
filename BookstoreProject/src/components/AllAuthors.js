import {View,Text,FlatList,TouchableOpacity,ImageBackground,Dimensions,TextInput} from 'react-native'
import {useState,useEffect,useContext} from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
const Item = ({item,navigator}) => {
    return(
    <TouchableOpacity onPress={()=>navigator.navigate("Author",{author:{name:item.name,authId:item.auth_id}})} style={{margin:10,backgroundColor:'rgba(30,57,52,0.9)',padding:20,borderRadius:20,elevation:5,borderColor:'white',borderWidth:2}}>
            <Text style={{color:"white"}}>{item.name}</Text>
    </TouchableOpacity>)
}


const AllAuthors = () =>
{
    const [searchAuthor,setSearchAuthor] = useState("")

    const navigator = useNavigation()

    const [authors,setAuthors] = useState([])

    const {userDet} = useContext(AuthContext)

    const getData = async () =>
    {
        let response = await axios.get(`http://10.0.2.2:5000/author/getallauthor`,{
            headers: {'Content-Type': 'application/json','token':userDet.accTok}
          }).then(data=>data.data.authors).catch(err=>err)
        setAuthors(response)

    }

    useEffect(()=>
    {
        getData()
    },[])




    const renderAuthors = ({item}) =>
    {
            if(item.name.toLowerCase().includes(searchAuthor.toLowerCase()))
            {
                return(<Item navigator={navigator} item={item}/>)
            }

           
    }

    const handleSearch =(text) =>
    {
        setSearchAuthor(text)
    }
    
    return(
        <ImageBackground resizeMode="cover" source={require("./../../assets/authorbackground.jpg")} style={{position:'absolute',left:0, 
        right:0, 
        top:0,
        bottom:0,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height}}>

        <View style={{marginLeft:20,marginRight:20,marginTop:20,marginBottom:220}}>
            <TextInput value={searchAuthor} onChangeText={handleSearch} placeholder="Search for Author" style={{marginLeft:15,marginRight:15,marginBottom:10,borderRadius:20,padding:10,backgroundColor:'white'}} />
            <FlatList
                    data={authors}
                    renderItem={renderAuthors}
                    keyExtractor={(item) => item.id}

            />
        </View>
        </ImageBackground>
    )
}

export default AllAuthors;
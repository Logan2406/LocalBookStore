import { useRoute } from '@react-navigation/native';
import { Text,View,SafeAreaView,FlatList,TouchableOpacity,Image,TextInput } from 'react-native';
import {useState,useEffect,useContext} from 'react';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';


const Item =({item}) =>
{
    return(
    <TouchableOpacity style={{backgroundColor:'white',margin:20,padding:10,borderRadius:20,flexDirection:'row'}}>
            <View style={{flex:1}}>
                <Image style={{width:70,height:120}} source={require("../../assets/da_vinci.jpg")}/>
            </View>
            <View style={{flex:2}}>
                <Text>{item.book_name}</Text>
                <Text>{item.auth_name}</Text>
                <Text>{item.img_path==undefined?"":item.img_path.split("/")[2]}</Text>
                <Text>{item.img_path==undefined?"":item.img_path.split("/")[3]}</Text>
                <Text>No. of Copies available : {item.copies_left}</Text>
            </View>
        </TouchableOpacity>
    )
}



const SearchBook = () =>
{
    const {userDet} = useContext(AuthContext)

    const route = useRoute();

    const [books,setBooks] = useState([])

    const [searchText,setSearchText] = useState(route.params.searchValue);


    const getData =async()=>
    {
        let response =  await axios.post(`http://10.0.2.2:5000/user/getsearch`,{genres:route.params.genres,languages:route.params.languages,search:route.params.searchValue},{
            headers: {'Content-Type': 'application/json','token':userDet.accTok}
          }).then(data=>data.data.books).catch(err=>err);

          setBooks(response)
          console.log(books)
    }

    useEffect(()=>
    {
      getData()
    },[])



    const renderItem=({item})=>
    {
        return(<Item item={item}/>)
    }

    const handleText = (text) =>
    {
        setSearchText(text)
    }

    return(
        <SafeAreaView>
            <TextInput
                onChangeText={handleText}
                value={searchText}
                style={{margin:20,borderRadius:10,borderWidth:2,borderColor:'red',padding:10,backgroundColor:'white'}}
                placeholder="Search Book"
        />

        <FlatList
            data={books}
            renderItem={renderItem}
            keyExtractor={item => item.id}
      />

         </SafeAreaView>
    )

}

export default SearchBook;
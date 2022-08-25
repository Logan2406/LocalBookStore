import {View,Image,Text,FlatList,SafeAreaView,TouchableOpacity} from 'react-native'
import {useState}  from 'react'
import { useRoute } from '@react-navigation/native'


const Item=({item}) =>
{
    return(
            <TouchableOpacity style={{margin:10,backgroundColor:'white',borderRadius:10,padding:10}}>
                <Text>{item.name}</Text>
            </TouchableOpacity>
    )
}


const Topten = (props) =>
{
    const route = useRoute()

    const [books,setBooks]  = useState([{id:1,name:'ABCJSUALSA'},
                                        {id:2,name:'ABCJSUALSA'},
                                        {id:3,name:'ABCJSUALSA'},
                                        {id:4,name:'ABCJSUALSA'},
                                        {id:5,name:'ABCJSUALSA'},
                                        {id:6,name:'ABCJSUALSA'},
                                        {id:7,name:'ABCJSUALSA'},
                                        {id:8,name:'ABCJSUALSA'},
                                        {id:9,name:'ABCJSUALSA'},
                                        {id:10,name:'ABCJSUALSA'},])

    const renderItem = ({item}) =>
    {
        return(<Item item={item}/>)
    }

    return(
        <SafeAreaView style={{margin:20}}>
        <Text>Top 10 {route.params.genre}</Text>
       <FlatList
            data={books}
            renderItem={renderItem}
            keyExtractor={(item)=>item.id}

       />

        </SafeAreaView>
    )
}

export default Topten;
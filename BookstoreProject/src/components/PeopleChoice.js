import {View,Text,TouchableOpacity} from 'react-native'
import {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
const Genre = (props) =>
{
    const navigator = useNavigation()
    return(
        <TouchableOpacity onPress={()=>navigator.navigate("TopTen",{genre:props.name})} style={{height:100,width:130,margin:10,padding:20,borderRadius:20,backgroundColor:"rgba(17, 153, 173,0.9)"}}>
            <Text style={{color:'white'}}>Top 10 {props.name} Novels</Text>
        </TouchableOpacity>)
}



const PeopleChoice = () =>
{
    const [favGenres,setFavGenres] = useState(['Thriller','Romantic','Mythology'])
    return(
    <View style={{margin:20,backgroundColor:'rgba(255,90,51,0.8)',borderRadius:20,padding:20,borderWidth:2,borderColor:'#BAC0C1'}}>
        <Text style={{color:'#CADEE1',fontSize:25,textAlign:'center'}}>This is People's Choice</Text>
        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
        {favGenres.map((item,index)=>
        {
            return(<Genre name={item}/>)
        })}
        </View>
        
    </View>)
}

export default PeopleChoice;
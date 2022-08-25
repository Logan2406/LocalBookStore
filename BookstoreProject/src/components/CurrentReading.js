import { View,Text,ImageBackground,Image } from "react-native";
import {useState,useEffect,useContext} from 'react'
import axios from "axios";
import { AuthContext } from "../../AuthContext";

const CurrentReading = () =>
{
    const {userDet} = useContext(AuthContext)
    
    const [currentBook,setCurrentBook] = useState({})

    const getData = async() =>
    {
        let response =  await axios.get(`http://10.0.2.2:5000/user/currentread`,{
            headers: {'Content-Type': 'application/json','token':userDet.accTok}
          }).then(data=>data.data.book).catch(err=>err);

        if(response==="NO")
        {
            setCurrentBook(null)
        }
        else
        {
            setCurrentBook(response)
        }

    }

    useEffect(()=>
    {
        getData()
    },[])


        return(
          
            <View style={{borderColor:"rgb(92, 214, 184)",
                            flexDirection:'row',
                            justifyContent:'space-between',
                            paddingLeft:10,
                            paddingRight:10,
                            borderRadius:10, borderWidth:2,
                            margin:15,
                            backgroundColor:'rgba(92, 214, 184, 0.4)'}}>
                <View style={{flex:3}}>
                {currentBook===null?
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{marginTop:5}}>Currently not Reading any Book...</Text>
                        <Text style={{marginTop:5}}>Visit Library and grab a book</Text>
                    </View>
                    :
                    <>
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:15}}>
                        <Image style={{width:40,height:80,marginTop:5,marginBottom:5}} resizeMode='contain' source={require("../../assets/angels_demon.jpg")}></Image>
                        <View style={{marginLeft:10,marginRight:15,marginTop:10,marginBottom:5}}>
                            <Text>Book Name : {currentBook.book_name} </Text>
                            <Text>Author : {currentBook.auth_name}</Text>
                            <Text>Issue Date :{currentBook.issue_date===undefined?" ":currentBook.issue_date.split("T")[0]}</Text>
                        </View>
                    </View>
                    </>
                }
                    
                   
                </View>
                <Image style={{width:100,height:120,marginTop:5,marginBottom:5, flex:1}} resizeMode='contain' source={require("../../assets/reading.png")}/>
            </View>
           
    )

}
export default CurrentReading;
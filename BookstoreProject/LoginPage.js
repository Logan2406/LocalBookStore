import {View,Text,Image,TextInput,TouchableOpacity} from 'react-native';
import {useState,useContext} from 'react'
import { AuthContext } from './AuthContext';

const LoginPage = () =>
{
    const {login} = useContext(AuthContext);

    const [user,setUser] = useState({name:'',pass:''});

    const handleName=(val)=>
    {
        setUser({...user,name:val})
    }

    const handlePass=(val)=>
    {
        setUser({...user,pass:val})
    }
    return(
        <View style={{flex:1,justifyContent:'center'}}>
            <View style={{alignItems:'center'}}>
                <Image style={{height:160,width:160}} source={require("./assets/read.png")}/>
            </View>
            <View style={{marginLeft:40,marginRight:40}}>
                <View style={{marginTop:20}}>
                    <Text style={{marginLeft:10}}>Enter UserName</Text>
                    <TextInput style={{borderWidth:2,borderColor:'blue',borderRadius:20,padding:10}} onChangeText={handleName} value={user.name} editable/>
                </View>
                <View style={{marginTop:20}}>
                    <Text style={{marginLeft:10}}>Enter Password</Text>
                    <TextInput style={{borderWidth:2,borderColor:'blue',borderRadius:20,padding:10}} onChangeText={handlePass} value={user.pass} editable/>
                </View>
               
            </View>
            <TouchableOpacity onPress={()=>login(user)}style={{backgroundColor:'grey',margin:40,alignItems:'center',borderRadius:20}}>
                <Text style={{fontSize:50}}>Login</Text>
            </TouchableOpacity>
           
        </View>
    )
}

export default LoginPage;
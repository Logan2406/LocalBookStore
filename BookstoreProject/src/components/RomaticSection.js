import { View,Text,Image,TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
const RomanticSection = (props) =>
{
    const navigator = useNavigation()

    const images = {Romantic:require("../../assets/icons/romantic.png"),
                    Kids:require("../../assets/icons/kids.png"),
                    Thriller:require("../../assets/icons/thriller.png"),
                    Horror:require("../../assets/icons/horror.png"),
                    Mythology:require("../../assets/icons/mythology.png"),
                    Fantasy:require("../../assets/icons/fantasy.png")
}


    return(
        <View style={{
        borderColor:'rgba(92, 214, 184, 0.7)',
        flexDirection:'column',
        paddingLeft:10,
        paddingRight:10,
        borderRadius:10,
        paddingTop:10,
        paddingBottom:10,
        borderWidth:2,
        margin:15,
        elevation:5,
        backgroundColor:'rgba(11,36,31, 0.8)'}}>
        
        <Text style={{fontSize:25,elevation:10,color:'white'}}>{props.name} Novels</Text>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{}}>
                <View style={{flex:3,flexDirection:'row',marginTop:10}}>
                    <Image  style={{width:40,height:70,marginRight:5}} resizeMode='contain' source={require("../../assets/angels_demon.jpg")}/>
                    <Image  style={{width:40,height:70,marginLeft:5,marginRight:5}} resizeMode='contain' source={require("../../assets/da_vinci.jpg")}/>
                    <Image  style={{width:40,height:70,marginLeft:5,marginRight:5}} resizeMode='contain' source={require("../../assets/deception_point.jpg")}/>
                    <Image  style={{width:40,height:70,marginLeft:5,marginRight:5}} resizeMode='contain' source={require("../../assets/da_vinci.jpg")}/>
                    <Image  style={{width:40,height:70,marginLeft:5,marginRight:5}} resizeMode='contain' source={require("../../assets/deception_point.jpg")}/>
            
                </View>
            <View style={{marginTop:20,marginBottom:10,marginRight:30}}>
                    <TouchableOpacity style={{
                    borderWidth:1,
                    padding:10,
                    borderRadius:50,
                    borderColor:'red',
                    justifyContent:"center",
                    alignItems:'center',
                    backgroundColor:'rgba(140, 188, 174,0.8)',
                    elevation:2
                }}
                onPress={()=>navigator.navigate("BookGenre",{name:props.name})}
                >
                    <Text style={{color:"#030907"}}>100+ Books</Text>
                    <Text style={{color:'#030907'}}>View All The Books</Text>
                </TouchableOpacity>
            </View>
            </View>
            
            
            <Image style={{height:130,width:130,marginTop:5,marginBottom:10}} resizeMode='contain' source={images[props.name]}/>
            
        </View>
           
        </View>
    )
}

export default RomanticSection 
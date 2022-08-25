import { View,Text,Image,TouchableOpacity} from "react-native";

const BooksRead = () =>
{
    return(
    <View style={{
                    borderColor:'red',
                    borderWidth:2, 
                    marginTop:15,
                    marginLeft:15,
                    marginRight:15 ,
                    borderRadius:10,
                    padding:10,
                    backgroundColor:'rgba(151, 69, 186, 0.7)'}}>
        <Text>My Reading List</Text>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>

       
        <View style={{flexDirection:'row',marginTop:10}}>
            <Image  style={{width:50,height:80,marginRight:5}} resizeMode='contain' source={require("../../assets/angels_demon.jpg")}/>
            <Image  style={{width:50,height:80,marginLeft:5,marginRight:5}} resizeMode='contain' source={require("../../assets/da_vinci.jpg")}/>
            <Image  style={{width:50,height:80,marginLeft:5,marginRight:5}} resizeMode='contain' source={require("../../assets/deception_point.jpg")}/>
            <Image  style={{width:50,height:80,marginLeft:5,marginRight:15}} resizeMode='contain' source={require("../../assets/origin.jpg")}/>
        </View>
        <View style={{justifyContent:'center'}}>
            <TouchableOpacity style={{alignItems: "center", borderWidth:2,borderColor:'#45ba9b',backgroundColor: "rgba(140, 255, 224,0.8)",padding: 10,borderRadius:15}}>
                <Text>View More</Text>
                <Image style={{width:20,height:20}}source={require("../../assets/icons/fast-forward.png")}></Image>
            </TouchableOpacity>
        </View>
        </View>
    </View>)
}

export default BooksRead;
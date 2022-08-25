import { DrawerContentScrollView,DrawerItemList } from "@react-navigation/drawer";
import {View,Text, ImageBackground, Image} from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler";

import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const CustomDrawer = (props) =>
{
    const {logout} = useContext(AuthContext);
    return(
        <View style={{flex:1,backgroundColor:'orange'}}>
            <DrawerContentScrollView {...props}
                contentContainerStyle={{backgroundColor:'orange'}}
            >
                <ImageBackground source={require("./assets/imgBack.jpg")} style={{padding:10, flexDirection:'row'}} imageStyle={{opacity:0.5}}>
                    <View style={{alignItems:"center"}}>
                        <Image source={require("./assets/icons/man.png")} style={{height:100,width:100, borderRadius:50,marginBottom:10}}/>
                        <Text>John Doe</Text>
                        <Text>User : </Text>
                    </View>
                </ImageBackground>
                <View style={{flex:1,paddingTop:40,paddingLeft:10,paddingRight:10, paddingBottom:40}}>
                <DrawerItemList {...props}/>
                </View>
            </DrawerContentScrollView>
            <ImageBackground source={require("./assets/imgBack.jpg")} resizeMode="cover" style={{padding:10, flexDirection:'row',backgroundColor: 'orange'}} imageStyle={{opacity:0.5}}>
                <View style={{paddingTop:80}}>
                <TouchableOpacity style={{marginLeft:20,borderColor:'black',borderWidth:1,borderRadius:4,padding:10,width:200,alignItems:'center'}}>
                        <Text style={{fontWeight:'bold'}}>Share with others</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>logout()} style={{marginLeft:20,borderColor:'black',borderWidth:1,borderRadius:4,padding:10,width:200,alignItems:'center'}}>
                        <Text style={{fontWeight:'bold'}}>Sign Out</Text>
                </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

export default CustomDrawer;